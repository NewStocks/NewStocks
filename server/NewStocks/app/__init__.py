import os
import dotenv
from flask import Flask,request
from pykrx import stock
import pandas as pd
import pymysql
from dotenv import load_dotenv

dotenv_file=dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)
app = Flask(__name__)
# .env 파일에서 환경 변수 로드
load_dotenv()
# .env 파일에서 데이터베이스 연결 정보 가져오기
DB_URL = os.environ['DB_URL']
DB_ID = os.environ['DB_ID']
DB_PWD = os.environ['DB_PWD']
DB_NAME = os.environ['DB_NAME']
# MySQL 연결 설정
db_config = {
    'host': DB_URL,
    'user': DB_ID,
    'password': DB_PWD,
    'database': DB_NAME,  # 데이터베이스 이름
}

kospi_industry_data = {
    1005: "음식료품",
    1006: "섬유의복",
    1007: "종이목재",
    1008: "화학",
    1009: "의약품",
    1010: "비금속광물",
    1011: "철강금속",
    1012: "기계",
    1013: "전기전자",
    1014: "의료정밀",
    1015: "운수장비",
    1016: "유통업",
    1017: "전기가스업",
    1018: "건설업",
    1019: "운수창고업",
    1020: "통신업",
    1021: "금융업",
    1022: "은행",
    1024: "증권",
    1025: "보험",
    1026: "서비스업",
    1027: "제조업"
}
kosdac_industry_data ={
    2015: "코스닥 IT",
    2024: "제조",
    2026: "건설",
    2027: "유통",
    2029: "운송",
    2031: "금융",
    2037: "오락,문화",
    2041: "통신방송서비스",
    2042: "IT S/W & SVC",
    2043: "IT H/W",
    2056: "음식료·담배",
    2058: "섬유·의류",
    2062: "종이·목재",
    2063: "출판·매체복제",
    2065: "화학",
    2066: "제약",
    2067: "비금속",
    2068: "금속",
    2070: "기계·장비",
    2072: "일반전기전자",
    2074: "의료·정밀기기",
    2075: "운송장비·부품",
    2077: "기타 제조",
    2151: "통신서비스",
    2152: "방송서비스",
    2153: "인터넷",
    2154: "디지털컨텐츠",
    2155: "소프트웨어",
    2156: "컴퓨터서비스",
    2157: "통신장비",
    2158: "정보기기",
    2159: "반도체",
    2160: "IT부품",
}
# MySQL 연결 함수
def connection_mysql():
    try:
        conn = pymysql.connect(**db_config)
    except Exception as e:
        print(str(e))
    return conn

def set_category_where(industry_data):
    conn=connection_mysql()
    cursor = conn.cursor()
    for category_type,category_name in industry_data.items():
        try:
            # 주식 종목 가져오기
            stock_list = stock.get_index_portfolio_deposit_file(str(category_type))
            # 데이터 배열에 저장
            templist = list(stock_list)
            for i in templist:
                stock_id=i
                cursor.execute("SELECT stock_id FROM stock_category WHERE stock_id = %s", (stock_id,))
                existing_record = cursor.fetchone()

                if not existing_record:
                    # stock_category 테이블에 존재하지 않는 경우에만 삽입
                    cursor.execute(
                        "INSERT INTO stock_category (category_name, category_type, stock_id) VALUES (%s, %s, %s)",
                        (category_name, category_type, stock_id))

            conn.commit()
        except Exception as e:
            print(f"업종 코드 {category_type} 데이터를 가져오는 중 오류 발생: {str(e)}")
            return e
    return "success"

@app.route('/get-category', methods=['GET'])
def set_category():
    try:
        set_category_where(kospi_industry_data)
        set_category_where(kosdac_industry_data)
    except Exception as e:
        print(str(e))
        return e
    return "success"

#stockId 기반으로 일봉 데이터 받아와 DB에 저장
@app.route('/save-all-korea-stock-info', methods=['POST'])
def save_stock_info_data():
    try:
        # POST 요청에서 stockDto 데이터 추출
        range_data = request.json  # Assuming the request data is in JSON format
        # stockDto에서 필요한 데이터 추출
        start_date = range_data['startDate']
        end_date = range_data['endDate']

        #DB에 즉시 절대 연결
        conn=connection_mysql()
        cursor = conn.cursor()

        #전체주식 리스트 가져오기
        stock_info_list=stock.get_market_cap(start_date)
        pd.set_option('display.max_rows', None)
        # 코스닥 시장의 주식 코드 가져오기
        kosdaq_code_list = stock.get_market_ticker_list(market="KOSDAQ")
        kospi_code_list = stock.get_market_ticker_list(market="KOSPI")
        #O(1)로 탐색최적화하깅
        kospi_code_set = set(kospi_code_list)
        kosdaq_code_set = set(kosdaq_code_list)

        # 데이터프레임을 순회하면서 주식 정보 추출
        for index, row in stock_info_list.iterrows():
            stock_code = index  # 주식 코드
            stock_name = stock.get_market_ticker_name(stock_code)  # 주식 이름
            # 이미 포함된 정보 활용
            listed_shares = int(row['상장주식수'])  # 상장주식수
            market_cap = int(row['시가총액'])  # 시가총액
            try:
                # 외국인 주식 비율 및 외국인 주식수 정보 가져오기
                foreign_info = stock.get_exhaustion_rates_of_foreign_investment(start_date, end_date, stock_code)
            except Exception as e:
                # 외국인 정보를 가져오지 못한 경우에 대한 예외 처리
                foreign_info = None

                # 필요한 정보를 리스트로 저장
            stock_data = [stock_code, stock_name, market_cap, listed_shares, 0, 0, 0, "empty", 0]
            # 주식 코드를 집합을 사용하여 검색합니다.
            if stock_code in kospi_code_set:
                #1이면 코스피
                market = 1
            elif stock_code in kosdaq_code_set:
                #2면 코스닥
                market = 2
            else:
                market = 0
            stock_data[6]=market

            if foreign_info is not None:
                # 외국인 정보가 있는 경우에만 해당 정보로 업데이트
                for index, row in foreign_info.iterrows():
                    stock_data[4] = float(row['지분율'])
                    stock_data[5] = int(row['보유수량'])  # 외국인 주식수
            print(stock_data)
            # 큰 리스트에 주식 데이터 추가
            # all_stock_data.append(stock_data)
            stock_code, stock_name, market_cap, listed_shares, foreign_percent, foreign_shares, stock_market, sector, delisting = stock_data
            cursor.execute("SELECT id FROM stock WHERE id = %s", stock_code)
            existing_record = cursor.fetchone()

            if existing_record:
                cursor.execute(
                    "UPDATE stock SET name = %s, market_cap = %s, listed_shares = %s, foreign_percent = %s, foreign_shares = %s, stock_market = %s, sector = %s, delisting = %s WHERE id = %s",
                    (stock_name, market_cap, listed_shares, foreign_percent, foreign_shares, stock_market, sector, delisting, stock_code))
            else:
                cursor.execute(
                    "INSERT INTO stock (id, name, market_cap, listed_shares, foreign_percent, foreign_shares, stock_market, sector, delisting) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (stock_code, stock_name, market_cap, listed_shares, foreign_percent, foreign_shares, stock_market, sector, delisting))
            conn.commit()
            # Commit changes to the database
    except Exception as e:
        return f"오류 발생: {str(e)}"
    finally:
        cursor.close()
        conn.close()
    return "주식 데이터가 성공적으로 저장되었습니다."



#endDate는 갱신하는 날짜로 하공, startDate는 정확히 2년전의 해당달의 1일로 하자
#그래야 갱신이 편할듯
@app.route('/save-all-daily-stock-data', methods=['POST'])
def save_daily_chart_data():
    try:
        # POST 요청에서 stockDto 데이터 추출
        stock_data = request.json
        # stockDto에서 필요한 데이터 추출
        stock_id = stock_data['stockId']
        start_date = stock_data['startDate']
        end_date = stock_data['endDate']
        print(start_date,end_date)
        # MySQL 연결
        conn = connection_mysql()
        cursor = conn.cursor()

        stock_chart = stock.get_market_ohlcv_by_date(start_date, end_date, stock_id)
        # 데이터프레임을 MySQL 테이블에 저장
        for index, row in stock_chart.iterrows():
            # 중복 데이터 체크
            check_query = """
                       SELECT 1 FROM chart 
                       WHERE stock_id = %s AND date = %s
                       """
            cursor.execute(check_query, (stock_id, index.strftime('%Y-%m-%d')))
            result = cursor.fetchone()

            if result:
                # 중복 데이터가 있고 날짜가 endDate와 일치하면 업데이트
                if index.strftime('%Y-%m-%d') == end_date:
                    print("update")
                    update_query = """
                            UPDATE chart
                            SET start_price = %s, end_price = %s, high_price = %s, low_price = %s, volume = %s
                            WHERE stock_id = %s AND date = %s
                            """
                    cursor.execute(update_query, (
                        int(row['시가']), int(row['종가']), int(row['고가']), int(row['저가']), int(row['거래량']),
                        stock_id, index.strftime('%Y-%m-%d')))
                else:
                    print("already")
                    continue
            else:
                # 중복 데이터가 없으면 새로운 데이터로 저장
                print("save new")
                insert_query = """
                           INSERT INTO chart (stock_id, date, start_price, end_price, high_price, low_price, volume)
                           VALUES (%s, %s, %s, %s, %s, %s, %s)
                           """
                cursor.execute(insert_query, (
                stock_id, index.strftime('%Y-%m-%d'), int(row['시가']), int(row['종가']), int(row['고가']), int(row['저가']),
                int(row['거래량'])))
        conn.commit()
        return "일봉 데이터가 MySQL에 저장되었습니다."
    except Exception as e:
        return f"오류 발생: {str(e)}"
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run()








#메서드 학습
# stock.get_market_ohlcv_by_date("20210401", "20230904", "005930")
# 모든 행을 출력하도록 pandas 출력 옵션 설정
# pd.set_option('display.max_rows', 20)
