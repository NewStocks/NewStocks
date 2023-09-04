from flask import Flask
from pykrx import stock
import pandas as pd
import pymysql

app = Flask(__name__)

# MySQL 연결 설정
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'newstocks',
}

# 삼성전자(005930) 주식의 일봉 데이터 가져오기
samsung_daily_chart = stock.get_market_ohlcv_by_date("20210401", "20230904", "005930")

# Flask 루트 경로에서 데이터베이스에 데이터 저장
@app.route('/test')
def save_to_mysql():
    try:
        # MySQL 연결
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()

        # 테이블 생성 (이미 존재하는 경우 무시)
        create_table_query = """
        CREATE TABLE IF NOT EXISTS samsung_daily_chart (
            date DATE PRIMARY KEY,
            code VARCHAR(10),
            open INT,
            high INT,
            low INT,
            close INT,
            volume BIGINT
        )
        """
        cursor.execute(create_table_query)
        conn.commit()

        # 데이터프레임을 MySQL 테이블에 저장
        for index, row in samsung_daily_chart.iterrows():
            insert_query = """
            INSERT INTO samsung_daily_chart (date, code, open, high, low, close, volume)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (index.strftime('%Y-%m-%d'), '005930', row['시가'], row['고가'], row['저가'], row['종가'], row['거래량']))

        conn.commit()
        return "데이터가 MySQL에 저장되었습니다."

    except Exception as e:
        return f"오류 발생: {str(e)}"

    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run()








# ##메서드 학습
#
# #chart
#
#
# # 삼성전자(005930) 주식의 일봉 데이터 가져오기
# samsung_daily_chart = stock.get_market_ohlcv_by_date("20210401", "20230904", "005930")
# # 모든 행을 출력하도록 pandas 출력 옵션 설정
# pd.set_option('display.max_rows', 20)
# print(samsung_daily_chart)
# #static
#
# # 코스피 시장의 주식 코드 가져오기
# kospi_code_list = stock.get_market_ticker_list(market="KOSPI")
#
# print("코스피 주식 코드와 이름 목록:")
# # 코스피 시장 주식코드로 주식명 가져오기
# kospi_code_name_list=dict()
# for code in kospi_code_list:
#     kospi_code_name_list[code]=stock.get_market_ticker_name(code)
# print(kospi_code_name_list)
# print(len(kospi_code_name_list))
#
#
# stock_list=[]
# # 코스닥 시장의 주식 코드 가져오기
# kosdaq_code_list = stock.get_market_ticker_list(market="KOSDAQ")
# print("\n코스닥 주식 코드와 이름 목록:")
# kosdaq_code_name_list=dict()
# for code in kosdaq_code_list:
#     stock_list.append({})
#     kosdaq_code_name_list[code]=stock.get_market_ticker_name(code)
# print(kosdaq_code_name_list)
# print(len(kosdaq_code_name_list))
#
#
#
# #dynamic
