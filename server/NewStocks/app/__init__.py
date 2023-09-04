from pykrx import stock
import pandas as pd
import mplfinance as mpf
import numpy as np
import plotly.graph_objects as go
import plotly.subplots as ms
import plotly.express as px


# 전체 종목코드와 종목명 가져오기
stock_list = pd.DataFrame({'005930':stock.get_market_ticker_list(market="ALL")})
stock_list['005930'] = stock_list['005930'].map(lambda x: stock.get_market_ticker_name(x))

# stock_name의 2021년 주가 데이터 가져오기
stock_name = "삼성전자"
stock_from = "20230828"
stock_to = "20230830"

ticker = stock_list.loc[stock_list['종목명']== stock_name, '005930']
df = stock.get_market_ohlcv_by_date(fromdate=stock_from, todate=stock_to, ticker=ticker)
# 칼럼명을 영문명으로 변경
df = df.rename(columns={'시가':'Open', '고가':'High', '저가':'Low', '종가':'Close', '거래량':'Volume'})

df["Close"]=df["Close"].apply(pd.to_numeric,errors="coerce")

print(df.head())