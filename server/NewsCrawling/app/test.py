from flask import Flask
from bs4 import BeautifulSoup
import pymysql
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import requests
import time
from concurrent.futures import ThreadPoolExecutor
import re
import hanja
from sklearn.cluster import DBSCAN
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)
load_dotenv()

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
all_page = 0


def reset_global_variable():
    global process_count, urls, infos, url_set, all_page

    process_count, urls, infos, url_set, all_page = 0, [], [], set(), 0
    return


def crawler(URL):
    global process_count, is_all, all_page, url_set
    print(process_count, URL[-12:-6])
    process_count += 1
    page = 1
    while page <= 10:
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

            if not is_all:
                # 날짜 문자열을 날짜로 변환
                news_date = datetime.strptime(date_text.split()[0], "%Y.%m.%d").date()
                # 어제 날짜보다 이전이면 반복문 종료
                if news_date > one_day_ago.date():
                    continue
                elif news_date < one_day_ago.date():
                    isEmpty = True
                    break

            # 정보 추가
            infos.append(
                [company_text, date_text[1:], title_text, link_url, link_url[-6:]]
            )

        # 해당 페이지에 기사가 더이상 없다면
        last = html.select(".pgRR")
        if isEmpty or len(last) == 0:
            break

        page += 1
        all_page += 1

    # print(infos[-1][4], page)
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

    cnt = 0
    for title, l, p in zip(texts, labels, probs):
        print(title, l, p)
        cnt += 1

    print(cnt)


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


# @app.route("/save-all-news", methods=["POST"])
def save_all_news():
    global infos, is_all
    is_all = True

    # for stock_id in ["000020", "000040", "000050", "000070", "000075", "000080"]:
    for stock_id in ["035720"]:
        urls.append(
            "https://finance.naver.com/item/news_news.nhn?code=" + stock_id + "&page="
        )

    for url in urls:
        crawler(url)

    # 군집화
    titles = []
    all_titles = []
    clustering = []
    prev_date = infos[0][1][:7]  # 첫 뉴스의 발행 연도, 월
    for _, date, title, _, _ in infos:
        cur_date = date[:7]
        if prev_date != cur_date:
            print(titles)
            clustering.extend(news_clustering(titles, len(clustering)))
            prev_date = cur_date
            titles = []

        titles.append(title)
        all_titles.append(title)

    clustering.extend(news_clustering(titles, len(clustering)))

    clustered_list = set()
    num_set = set()
    for title, r in zip(all_titles, clustering):
        if r not in num_set:
            clustered_list.add((title))
            num_set.add(r)

    # print(*clustered_list, sep="\n")
    print("길이: ", len(clustered_list))
    sentiment_analysis(clustered_list, "ko")
    print(time.time() - start_time)


if __name__ == "__main__":
    start_time = time.time()
    print("start_time time:", start_time)
    save_all_news()
    # app.run(port=5000)
