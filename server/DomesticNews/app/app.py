from flask import Flask
from bs4 import BeautifulSoup
import pymysql
from datetime import datetime, timedelta
import requests
import time, os
from concurrent.futures import ThreadPoolExecutor
import re
import hanja
from sklearn.cluster import DBSCAN
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from collections import defaultdict

app = Flask(__name__)

# MySQL 연결 설정
db_config = {
    "host": os.getenv("DB_URL"),
    "user": os.getenv("DB_ID"),
    "password": os.getenv("DB_PWD"),
    "database": os.getenv("DB_NAME"),
}


# 현재 날짜에서 1일을 빼서 하루 전 날짜 얻기
one_day_ago = datetime.now() - timedelta(days=1)

start_time, end, process_count, is_all = 0, 0, 0, False
urls, infos = [], []
url_set = set()


def reset_global_variable():
    global process_count, urls, infos, url_set
    process_count, urls, infos, url_set = 0, [], [], set()
    return


def crawler(URL):
    global process_count, is_all, url_set
    print(process_count, URL[-12:-6])
    process_count += 1
    page = 1
    while page <= 400:
        url = URL + str(page)
        source_code = requests.get(url).text
        html = BeautifulSoup(source_code, "html.parser")
        titles = html.select(".title")
        links = html.select(".title")
        dates = html.select(".date")
        companys = html.select(".info")
        isEmpty = True

        for title, link, date, company in zip(titles, links, dates, companys):
            isEmpty = False
            title_text = title.get_text().strip().replace("\n", "")  # title 수정
            link_url = (
                    "https://finance.naver.com" + link.find("a")["href"].split("&page")[0]
            )
            date_text = date.get_text()
            company_text = company.get_text()

            if link_url in url_set:
                continue
            url_set.add(link_url)

            news_date = datetime.strptime(date_text.split()[0], "%Y.%m.%d").date()
            # 어제 날짜보다 최신이면 넘김
            if news_date > one_day_ago.date():
                continue

            # 전체 조회가 아니고, 어제 날짜보다 과거라면
            if not is_all and news_date < one_day_ago.date():
                isEmpty = True
                break

            # 정보 추가
            infos.append([company_text, date_text, title_text, link_url, link_url[-6:]])

        # 해당 페이지에 기사가 더이상 없다면
        last = html.select(".pgRR")
        if isEmpty or len(last) == 0:
            break

        page += 1

    return


def preprocessing(titles):
    def cleansing_chinese(sentence=None):
        """
        한자를 변환하는 전처리를 하는 함수
        :param sentence: 전처리 대상 문장
        :return: 전처리 완료된 문장
        """
        # chinese character를 앞뒤로 괄호가 감싸고 있을 경우, 대부분 한글 번역임
        sentence = re.sub(
            "\([\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD]+\)",
            "",
            sentence,
        )
        # 다른 한자가 있다면 한글로 치환
        if (
                re.search(
                    "[\u2E80-\u2FD5\u3190-\u319f\u3400-\u4DBF\u4E00-\u9FCC\uF900-\uFAAD]",
                    sentence,
                )
                is not None
        ):
            sentence = hanja.translate(sentence, "substitution")

        return sentence

    # 전처리 함수 구성
    def clean_text(text):
        text = cleansing_chinese(text)
        text = text.replace("&lt;", "<").replace("&gt;", ">")  # 괄호로 변경
        # text = re.sub('(<([^>]+)>)', '', text) # 괄호내 문자와 괄호를 제거
        text = text.replace("&#039", "").replace("&quot;", "")  # 의미 없는 문자 제거

        pattern = "([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)"
        text = re.sub(pattern=pattern, repl="", string=text)  # 이메일 제거

        pattern = "(http|ftp|https)://(?:[-\w.]|(?:%[\da-fA-F]{2}))+"
        text = re.sub(pattern=pattern, repl="", string=text)  # url 제거

        pattern = "([ㄱ-ㅎㅏ-ㅣ]+)"
        text = re.sub(pattern=pattern, repl="", string=text)  # 자음, 모음 만 존재시 제거

        pattern = "[^\w\s.%]"
        text = re.sub(
            pattern=pattern, repl=" ", string=text
        )  # 단어, 띄어쓰기, 문자"." 이외의 특수문자 모두 제거
        text = text.strip()
        text = " ".join(text.split())

        return text

    titles_preprocessed = [clean_text(title) for title in titles]

    return titles_preprocessed


def news_clustering(titles, idx):
    titles_preprocessed = preprocessing(titles)
    tfidf_vectorizer = TfidfVectorizer(min_df=1, ngram_range=(1, 2))
    tfidf_vectorizer.fit(titles_preprocessed)

    vector = tfidf_vectorizer.transform(titles_preprocessed).toarray()
    vector = np.array(vector)
    model = DBSCAN(eps=0.9, min_samples=1, metric="cosine")
    result = model.fit_predict(vector)
    for i in range(len(result)):
        result[i] += idx
    return result


def sentiment_analysis(texts, lang="ko"):
    if lang == "ko":
        tokenizer = AutoTokenizer.from_pretrained("snunlp/KR-FinBert-SC")
        model = AutoModelForSequenceClassification.from_pretrained(
            "snunlp/KR-FinBert-SC"
        )
        id2label = {0: "NEGATIVE", 1: "NEUTRAL", 2: "POSITIVE"}

    else:
        tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
        model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
        id2label = {0: "POSITIVE", 1: "NEGATIVE", 2: "NEUTRAL"}

    labels = []
    probs = []

    for text in texts:
        inputs = tokenizer(text, return_tensors="pt")
        with torch.no_grad():
            logits = model(**inputs).logits
            probabilities = torch.softmax(logits, dim=1)
            predicted_class_id = probabilities.argmax(dim=1).item()
            predicted_class_prob = probabilities[0][predicted_class_id].item()

            labels.append(id2label[predicted_class_id])
            probs.append(predicted_class_prob)

    sentiment_dictionary = defaultdict(str)
    for title, label, p in zip(texts, labels, probs):
        sentiment_dictionary[title] = label

    return sentiment_dictionary

def cluster_title():
    # 군집화
    titles = []
    all_titles = []
    clustering = []
    prev_date = infos[0][1][:7]  # 첫 뉴스의 발행 연도, 월
    for _, date, title, _, _ in infos:
        cur_date = date[:7]
        if prev_date != cur_date:
            clustering.extend(news_clustering(titles, len(clustering)))
            prev_date = cur_date
            titles = []

        titles.append(title)
        all_titles.append(title)

    clustering.extend(news_clustering(titles, len(clustering)))

    title_set = set()
    num_set = set()
    for title, r in zip(all_titles, clustering):
        if r not in num_set:
            title_set.add(title)
            num_set.add(r)

    return title_set


@app.route("/save-news", methods=["POST"])
def save_news():
    global is_all, url_set, urls, infos

    try:
        start_time = time.time()
        print("start_time time:", start_time)
        # 전역 변수 초기화
        reset_global_variable()
        is_all = False

        # MySQL 연결
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()

        # 종목 코드 가져오기
        cursor.execute("SELECT id FROM stock")
        lst = cursor.fetchall()
        stock_ids = [k[0] for k in lst]
        conn.commit()

        for stock_id in stock_ids:
            urls.append(
                "https://finance.naver.com/item/news_news.nhn?code="
                + stock_id
                + "&page="
            )

        with ThreadPoolExecutor(max_workers=4) as executor:
            executor.map(crawler, urls)

        print("뉴스 개수: ", len(infos))
        print("군집화 직전까지 걸린 시간: ", time.time() - start_time)

        title_set = cluster_title()  # 군집화한 뉴스 제목
        sentiment_dictionary = sentiment_analysis(title_set, lang="ko")

        print("군집화한 뉴스 개수: ", len(title_set))

        # 데이터프레임을 MySQL 테이블에 저장
        check_duplicate = set()
        for company, publish_time, title, url, stock_id in infos:
            if title not in title_set or title in check_duplicate:
                continue

            check_duplicate.add(title)
            insert_query = """
            INSERT INTO news (company, publish_time, title, url, stock_id, sentiment_type)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (company, publish_time, title, url, stock_id, sentiment_dictionary[title]))
            conn.commit()

        print("실행 시간: ", time.time() - start_time)
        return "어제의 뉴스가 저장되었습니다."

    except Exception as e:
        return f"오류 발생: {str(e)}"

    finally:
        cursor.close()
        conn.close()


@app.route("/save-all-news", methods=["POST"])
def save_all_news():
    global is_all, url_set, urls, infos

    try:
        start_time = time.time()
        print("start_time time:", start_time)
        reset_global_variable()
        is_all = True

        # MySQL 연결
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()

        # 종목 코드 가져오기
        cursor.execute("SELECT id FROM stock")
        lst = cursor.fetchall()
        stock_ids = [k[0] for k in lst]
        conn.commit()

        for stock_id in stock_ids:
            urls.append(
                "https://finance.naver.com/item/news_news.nhn?code="
                + stock_id
                + "&page="
            )

        with ThreadPoolExecutor(max_workers=4) as executor:
            executor.map(crawler, urls)

        print("뉴스 개수: ", len(infos))
        print("군집화 직전까지 걸린 시간: ", time.time() - start_time)

        title_set = cluster_title()  # 군집화한 뉴스 제목
        sentiment_dictionary = sentiment_analysis(title_set, lang="ko")

        print("군집화한 뉴스 개수: ", len(title_set))

        # 데이터프레임을 MySQL 테이블에 저장
        cursor.execute("DELETE FROM news")
        check_duplicate = set()
        for company, publish_time, title, url, stock_id in infos:
            if title not in title_set or title in check_duplicate:
                continue

            check_duplicate.add(title)
            insert_query = """
            INSERT INTO news (company, publish_time, title, url, stock_id, sentiment_type)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (company, publish_time, title, url, stock_id, sentiment_dictionary[title]))
            conn.commit()

        print("실행 시간: ", time.time() - start_time)
        return "모든 뉴스가 저장되었습니다."

    except Exception as e:
        return f"오류 발생: {str(e)}"

    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5432)