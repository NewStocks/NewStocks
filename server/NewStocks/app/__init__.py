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
# MySQL 연결 함수
def connection_mysql():
    try:
        conn = pymysql.connect(**db_config)
    except Exception as e:
        print(str(e))
    return conn

#
#stockId 기반으로 일봉 데이터 받아와 DB에 저장
@app.route('/saveAllKoreaStockInfo', methods=['POST'])
def save_stock_info_data():
    try:
        kospi_code_list = stock.get_market_ticker_list(market="KOSPI")
        print("코스피 주식 코드와 이름 목록:")
        # 코스피 시장 주식코드로 주식명 가져오기
        kospi_stock_list=dict()
        for stock_id in kospi_code_list:
            kospi_stock_list[stock_id]={"이름": stock.get_market_ticker_name(stock_id)}
        print(kospi_stock_list)
        print(len(kospi_stock_list))

        stock_list=[]
        # 코스닥 시장의 주식 코드 가져오기
        kosdaq_code_list = stock.get_market_ticker_list(market="KOSDAQ")
        print("\n코스닥 주식 코드와 이름 목록:")
        kosdaq_code_name_list=dict()
        for code in kosdaq_code_list:
            stock_list.append({})
            kosdaq_code_name_list[code]={"이름": stock.get_market_ticker_name(code)}
        print(kosdaq_code_name_list)
        print(len(kosdaq_code_name_list))
    except Exception as e:
        print(str(e))
        return str(e)
    return "주식 데이터가 성공적으로 저장되었습니다."
@app.route('/saveAllDailyStockData', methods=['POST'])
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
