import pymysql, os, time
from flask import Flask
from datetime import datetime, timedelta
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

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
URL = "https://stockrow.com/"
# 현재 날짜와 시간 가져오기
current_datetime = datetime.now()
# 현재 날짜에서 1일을 빼서 하루 전 날짜 얻기
start_time, end, cnt, driver = 0, 0, 0, 0
urls, infos = [], []
months = {
    "Jan": "-01-",
    "Feb": "-02-",
    "Mar": "-03-",
    "Apr": "-04-",
    "May": "-05-",
    "Jun": "-06-",
    "Jul": "-07-",
    "Aug": "-08-",
    "Sep": "-09-",
    "Oct": "-10-",
    "Nov": "-11-",
    "Dec": "-12-",
}


def set_chromedriver():
    options = webdriver.ChromeOptions()  # 크롬 옵션 객체 생성
    options.add_argument("disable-gpu")
    try:
        # 크롬 드라이버 설치
        return webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), options=options
        )
    except Exception as e:
        print("예외가 발생했습니다:", str(e))
        print("외부 크롬드라이버를 다운로드 실패.")
        raise e


def convert_date(date, time_):
    year = str(datetime.now().year)
    month = months[date.split()[1]]
    day = date.split()[0]
    if len(day) == 1:
        day = "0" + day

    hour = time_.split(":")[0]
    minute = time_.split(":")[1][:-2]
    if time_[-2:] == "PM" and hour != "12":
        hour = int(hour) + 12

    return year + month + day + " " + str(hour) + ":" + minute


def crawler(code, name, is_all):
    global infos, driver

    url = URL + code
    print(url)
    driver.get(url)
    driver.implicitly_wait(20)
    time.sleep(3)

    single_news_group = driver.find_elements(By.CLASS_NAME, "single-news-group")
    for sng in single_news_group:
        groupDate = sng.find_element(By.CLASS_NAME, "group-date")
        times = sng.find_elements(By.CLASS_NAME, "published-at")
        titles = sng.find_elements(By.CLASS_NAME, "news-title")
        companys = sng.find_elements(By.CLASS_NAME, "source")

        for title, time_, company in zip(titles, times, companys):
            date_text = convert_date(groupDate.text, time_.text)

            # 전체 데이터 조회가 아닐 경우
            if is_all == False:
                news_date = datetime.strptime(date_text.split()[0], "%Y-%m-%d").date()
                if news_date > one_day_ago.date():
                    continue
                elif news_date < one_day_ago.date():
                    break

            infos.append(
                [
                    code,
                    title.text,
                    company.text,
                    date_text,
                    title.get_attribute("href"),
                    name,
                ]
            )

    return


def insert_infos(cursor, conn):
    # 데이터프레임을 MySQL 테이블에 저장
    for (
        value_chain_id,
        title,
        company,
        publish_time,
        url,
        value_chain_name,
    ) in infos:
        insert_query = """
        INSERT INTO value_chain_news
        (value_chain_id, title, company, publish_time, url, value_chain_name)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(
            insert_query,
            (value_chain_id, title, company, publish_time, url, value_chain_name),
        )
        conn.commit()
    return


@app.route("/save-value-chain-news", methods=["POST"])
def save_news():
    global infos, driver

    try:
        # MySQL 연결
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()
        driver = set_chromedriver()
        infos = []

        # 밸류체인 명 가져오기
        cursor.execute("SELECT id, value_chain_name FROM value_chain")
        lst = cursor.fetchall()
        codes = [(k[0], k[1]) for k in lst]
        conn.commit()

        for code, name in codes:
            crawler(code, name, False)

        # cursor.execute("DELETE FROM value_chain_news")
        insert_infos(cursor, conn)

        print("실행 시간: ", time.time() - start_time)
        return "어제의 뉴스가 저장되었습니다."

    except Exception as e:
        return f"오류 발생: {str(e)}"

    finally:
        driver.quit()
        cursor.close()
        conn.close()


@app.route("/insert-all", methods=["POST"])
def save_all_news():
    global infos, driver

    try:
        # MySQL 연결
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()
        driver = set_chromedriver()
        infos = []

        # 밸류체인 명 가져오기
        cursor.execute("SELECT id, value_chain_name FROM value_chain")
        lst = cursor.fetchall()
        codes = [(k[0], k[1]) for k in lst]
        conn.commit()

        for code, name in codes:
            crawler(code, name, True)

        cursor.execute("DELETE FROM value_chain_news")
        insert_infos(cursor, conn)

        print("실행 시간: ", time.time() - start_time)
        return "모든 뉴스가 저장되었습니다."

    except Exception as e:
        return f"오류 발생: {str(e)}"

    finally:
        driver.quit()
        cursor.close()
        conn.close()


if __name__ == "__main__":
    start_time = time.time()
    print("start_time time:", start_time)
    app.run(port=5001)
