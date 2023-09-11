from flask import Flask
from bs4 import BeautifulSoup
import pymysql
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import requests
import time
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
load_dotenv()

# MySQL 연결 설정
db_config = {
    "host": os.getenv("DB_URL"),
    "user": os.getenv("DB_ID"),
    "password": os.getenv("DB_PWD"),
    "database": os.getenv("DB_NAME"),
}

# 현재 날짜와 시간 가져오기
current_datetime = datetime.now()

# 현재 날짜에서 1일을 빼서 하루 전 날짜 얻기
one_day_ago = current_datetime - timedelta(days=1)

start_time, end, cnt = 0, 0, 0
urls, infos = [], []


def crawler(URL):
    global cnt
    print(cnt)
    cnt += 1
    page = 1
    while True:
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

            # 날짜 문자열을 날짜로 변환
            news_date = datetime.strptime(date_text.split()[0], "%Y.%m.%d").date()

            # 어제 날짜보다 이전이면 반복문 종료
            if news_date > one_day_ago.date():
                continue
            elif news_date < one_day_ago.date():
                isEmpty = True
                break

            # 정보 추가
            infos.append([company_text, date_text, title_text, link_url, link_url[-6:]])

        # 해당 페이지에 기사가 더이상 없다면
        if isEmpty:
            break

        page += 1

    return


@app.route("/save-news", methods=["POST"])
def save_news():
    global infos

    try:
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

        # 데이터프레임을 MySQL 테이블에 저장
        for company, publish_time, title, url, stock_id in infos:
            # URL을 사용하여 데이터베이스에서 검색
            cursor.execute("SELECT id FROM news WHERE url = %s", (url,))
            existing_row = cursor.fetchone()

            # URL이 데이터베이스에 없을 경우에만 데이터 삽입
            if not existing_row:
                insert_query = """
                INSERT INTO news (company, publish_time, title, url, stock_id)
                VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(
                    insert_query, (company, publish_time, title, url, stock_id)
                )
            conn.commit()

        print("실행 시간: ", time.time() - start_time)
        return "데이터가 MySQL에 저장되었습니다."

    except Exception as e:
        return f"오류 발생: {str(e)}"

    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    start_time = time.time()
    print("start_time time:", start_time)
    app.run(port=5000)
