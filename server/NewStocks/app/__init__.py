import os
import dotenv
from flask import Flask,request,jsonify
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
# MySQL 연결 설정
db_config = {
    'host': DB_URL,
    'user': DB_ID,
    'password': DB_PWD,
    'database': 'newstocks',  # 데이터베이스 이름
}

class IndustryCategory:
    def __init__(self, name):
        self.name = name
        self.data = []

kospi_industry_data = {
    1005: {"name": "음식료품", "data": ()},
    1006: {"name": "섬유의복", "data": ()},
    1007: {"name": "종이목재", "data": ()},
    1008: {"name": "화학", "data": ()},
    1009: {"name": "의약품", "data": ()},
    1010: {"name": "비금속광물", "data": ()},
    1011: {"name": "철강금속", "data": ()},
    1012: {"name": "기계", "data": ()},
    1013: {"name": "전기전자", "data": ()},
    1014: {"name": "의료정밀", "data": ()},
    1015: {"name": "운수장비", "data": ()},
    1016: {"name": "유통업", "data": ()},
    1017: {"name": "전기가스업", "data": ()},
    1018: {"name": "건설업", "data": ()},
    1019: {"name": "운수창고업", "data": ()},
    1020: {"name": "통신업", "data": ()},
    1021: {"name": "금융업", "data": ()},
    1022: {"name": "은행", "data": ()},
    1024: {"name": "증권", "data": ()},
    1025: {"name": "보험", "data": ()},
    1026: {"name": "서비스업", "data": ()},
    1027: {"name": "제조업", "data": ()}
}
kosdac_industry_data ={
    2015: {"name": "코스닥 IT", "data": ()},
    2024: {"name": "제조", "data": ()},
    2026: {"name": "건설", "data": ()},
    2027: {"name": "유통", "data": ()},
    2029: {"name": "운송", "data": ()},
    2031: {"name": "금융", "data": ()},
    2037: {"name": "오락,문화", "data": ()},
    2041: {"name": "통신방송서비스", "data": ()},
    2042: {"name": "IT S/W & SVC", "data": ()},
    2043: {"name": "IT H/W", "data": ()},
    2056: {"name": "음식료·담배", "data": ()},
    2058: {"name": "섬유·의류", "data": ()},
    2062: {"name": "종이·목재", "data": ()},
    2063: {"name": "출판·매체복제", "data": ()},
    2065: {"name": "화학", "data": ()},
    2066: {"name": "제약", "data": ()},
    2067: {"name": "비금속", "data": ()},
    2068: {"name": "금속", "data": ()},
    2070: {"name": "기계·장비", "data": ()},
    2072: {"name": "일반전기전자", "data": ()},
    2074: {"name": "의료·정밀기기", "data": ()},
    2075: {"name": "운송장비·부품", "data": ()},
    2077: {"name": "기타 제조", "data": ()},
    2151: {"name": "통신서비스", "data": ()},
    2152: {"name": "방송서비스", "data": ()},
    2153: {"name": "인터넷", "data": ()},
    2154: {"name": "디지털컨텐츠", "data": ()},
    2155: {"name": "소프트웨어", "data": ()},
    2156: {"name": "컴퓨터서비스", "data": ()},
    2157: {"name": "통신장비", "data": ()},
    2158: {"name": "정보기기", "data": ()},
    2159: {"name": "반도체", "data": ()},
    2160: {"name": "IT부품", "data": ()},
}
def set_category_where(industry_data):
    for industry_code,category_info in industry_data.items():
        try:
            # 주식 종목 가져오기
            stock_list = stock.get_index_portfolio_deposit_file(str(industry_code))
            # 데이터 배열에 저장
            category_info["data"] = set(stock_list)
            print(industry_code, category_info["data"])
        except Exception as e:
            print(f"업종 코드 {industry_code} 데이터를 가져오는 중 오류 발생: {str(e)}")
    return
@app.route('/get-category', methods=['GET'])
def set_category():
    try:
        #코스피
        set_category_where(kospi_industry_data)
        #코스닥
        set_category_where(kosdac_industry_data)
    except Exception as e:
        print(e)
        return e
    for j in kospi_industry_data:
        print(j)
    for i in kosdac_industry_data:
        print(i)
    return "success"


# MySQL 연결 함수
def connection_mysql():
    try:
        conn = pymysql.connect(**db_config)
    except Exception as e:
        print(str(e))
    return conn

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

        # 큰 리스트를 초기화
        all_stock_data = []

        # print(stock_info_list)
        # 데이터프레임을 순회하면서 주식 정보 추출
        for index, row in stock_info_list.iterrows():
            stock_code = index  # 주식 코드
            stock_name = stock.get_market_ticker_name(stock_code)  # 주식 이름

            # 이미 포함된 정보 활용
            listed_shares = row['상장주식수']  # 상장주식수
            market_cap = row['시가총액']  # 시가총액

            try:
                # 외국인 주식 비율 및 외국인 주식수 정보 가져오기
                foreign_info = stock.get_exhaustion_rates_of_foreign_investment(start_date, end_date, stock_code)
            except Exception as e:
                # 외국인 정보를 가져오지 못한 경우에 대한 예외 처리
                foreign_info = None

                # 필요한 정보를 리스트로 저장
            stock_data = [stock_name, stock_code, market_cap, listed_shares, 0, 0, 0]

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
                    stock_data[4] = row['지분율']
                    stock_data[5] = row['보유수량']  # 외국인 주식수
            print(stock_data)
            # 큰 리스트에 주식 데이터 추가
            all_stock_data.append(stock_data)
    except Exception as e:
        return f"오류 발생: {str(e)}"
    finally:
        cursor.close()
        conn.close()
    return "주식 데이터가 성공적으로 저장되었습니다."
@app.route('/save-all-daily-stock-data', methods=['POST'])
def save_daily_chart_data():
    try:
        # POST 요청에서 stockDto 데이터 추출
        stock_data = request.json  # Assuming the request data is in JSON format
        # stockDto에서 필요한 데이터 추출
        stock_id = stock_data['stockId']
        start_date = stock_data['startDate']
        end_date = stock_data['endDate']

        # MySQL 연결
        conn = connection_mysql()
        cursor = conn.cursor()
        # 테이블 생성 (이미 존재하는 경우 무시)
        create_table_query = """
        CREATE TABLE IF NOT EXISTS chart (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            stock_id VARCHAR(10),
            date DATE,
            start_price INT,
            end_price INT,
            high_price INT,
            low_price INT,
            volume BIGINT
        )
        """
        cursor.execute(create_table_query)
        conn.commit()

        #원문 양식
        # stock_chart= stock.get_market_ohlcv_by_date("20210401", "20230904", "005930")
        stock_chart = stock.get_market_ohlcv_by_date(start_date, end_date, stock_id)

        # 데이터프레임을 MySQL 테이블에 저장
        for index, row in stock_chart.iterrows():
            insert_query = """
            INSERT INTO chart (stock_id, date, start_price, end_price, high_price, low_price, volume)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (stock_id, index.strftime('%Y-%m-%d'), row['시가'], row['종가'], row['고가'], row['저가'], row['거래량']))

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
