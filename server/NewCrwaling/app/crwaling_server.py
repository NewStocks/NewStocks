from flask import Flask
from bs4 import BeautifulSoup
import pymysql
from datetime import datetime
from dotenv import load_dotenv
import os
from urllib.request import urlopen

app = Flask(__name__)
load_dotenv()

# MySQL 연결 설정
db_config = {
    'host': os.getenv("DB_URL"),
    'user': os.getenv("DB_ID"),
    'password': os.getenv("DB_PWD"),
    'database': os.getenv("DB_NAME"),
}


def crawler(stock_ids):

    infos = []
    for stock_id in stock_ids:
        print("stock_id:", stock_id)
        page = 1
        while True:
            url = 'https://finance.naver.com/item/news_news.nhn?code=' + \
                stock_id + '&page=' + str(page)
            source_code = urlopen(url)
            html = BeautifulSoup(source_code, 'html.parser')
            titles = html.select('.title')
            links = html.select('.title')
            dates = html.select('.date')
            companys = html.select('.info')
            isEmpty = True

            for title, link, date, company in zip(titles, links, dates, companys):
                isEmpty = False
                title_text = title.get_text().strip().replace('\n', '')  # title 수정
                link_url = 'https://finance.naver.com' + link.find('a')['href']
                date_text = date.get_text()
                company_text = company.get_text()

                # 날짜 문자열을 날짜로 변환
                news_date = datetime.strptime(
                    date_text.split()[0], '%Y.%m.%d').date()

                # 현재 날짜보다 이전이면 반복문 종료
                if news_date < datetime.now().date():
                    isEmpty = True
                    break

                # 정보 추가
                infos.append([company_text, date_text,
                             title_text, link_url, stock_id])

            # 해당 페이지에 기사가 더이상 없다면
            if isEmpty:
                break

            page += 1

    return infos


@app.route('/save-news', methods=['POST'])
def save_news():
    try:
        # MySQL 연결
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()

        # 종목 코드 가져오기
        cursor.execute('SELECT id FROM stock')
        lst = cursor.fetchall()
        stock_ids = [k[0] for k in lst]
        conn.commit()

        # 데이터프레임을 MySQL 테이블에 저장
        infos = crawler(stock_ids)
        # print(*infos, sep='\n')

        for (company, publish_time, title, url, stock_id) in infos:
            insert_query = '''
            INSERT INTO news (company, publish_time, title, url, stock_id)
            VALUES (%s, %s, %s, %s, %s)
            '''
            cursor.execute(
                insert_query, (company, publish_time, title, url, stock_id))

        conn.commit()
        return '데이터가 MySQL에 저장되었습니다.'

    except Exception as e:
        return f'오류 발생: {str(e)}'

    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run()
