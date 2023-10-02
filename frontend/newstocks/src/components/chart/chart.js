'use client'
import './chart.css';
import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState, useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, LineData, CrosshairMode, ColorType } from 'lightweight-charts';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import StockProfile from "@/components/StockProfile/StockProfile";

import ValueModal from "@/components/ValueModal/ValueModal";
import ChartModal from "@/components/ChartModal/ChartModal";
import ValueStockModal from "@/components/ValueStockModal/ValueStockModal";

import { useRecoilState } from 'recoil';
import { allFavoriteStocksState } from '@/recoil/favoriteStock';
import { postFavoriteStock, deleteFavoriteStock } from '@/services/favoriteStocks';
import { fetchStockInfo, fetchChartData } from '@/services/chart';

export default function ChartComponent() {
  const router = useRouter();
  const codeName = usePathname();
  const code = codeName.split('/').filter(Boolean)[0];
  const tabname = useSearchParams();
  const tab = tabname?.get('tab')
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const candlestickSeries = useRef(null);
  const tooltipRef = useRef(null);
  const chartApiRef = useRef(null);
  const volumeSeries = useRef(null);
  const [allFavoriteStocks, setAllFavoriteStocks] = useRecoilState(
    allFavoriteStocksState
  );

  const [stockInfo, setStockInfo ] = useState({});
  const [isStarred, setIsStarred] = useState(false);

  const handleAddStock = (stock) => {
    if (allFavoriteStocks.some((item) => item.stockId === stock.id)) {
      return;
    }

    const addStock = async (stock) => {
      try {
        const response = await postFavoriteStock(stock);
        // console.log(response);
        setAllFavoriteStocks((prev) => [
          ...prev,
          { stockId: stock.id, stockName: stock.name },
        ]);
      } catch (e) {
        console.error(e);
        alert("등록에 실패했습니다.");
      }
    };

    addStock(stock);
  };

  const handleDeleteStock = async (stock) => {

    try {
      const response = await deleteFavoriteStock(stock);

      const changedStockList = allFavoriteStocks.filter((eachStock) => {
        return eachStock.stockId !== stock.stockId;
      });
      setAllFavoriteStocks(changedStockList);
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };


  const toggleStar = () => {
    if (isStarred) {
      const stock = {
        stockId: stockInfo.id, 
        stockName: stockInfo.name
      }
      handleDeleteStock(stock)
    } else {
      const stock = {
        id: stockInfo.id,
        name: stockInfo.name
      }
      handleAddStock(stock)
    }
    setIsStarred(!isStarred);
  };

  const[chartData, setChartData] = useState({
    valuechain: true,
    name:'',
  })

  useEffect(() => {
    if (code && allFavoriteStocks.some((item) => item.stockId === code)) {
      setIsStarred(true);
    } else {
      setIsStarred(false);
    }

  }, [code, isStarred, allFavoriteStocks])


  useEffect(() => {
    const fetchStockData = () => {
      fetchStockInfo(code)
      .then((res) => {
        const chartname = res.data.name
        if (res.status === 200) {
          setStockInfo(res.data);
        }
        setChartData((prevdata) => ({
          ...prevdata,
          name: chartname
        }))
      })
      .catch((err) => {
        console.log(err);
      });
    };
    fetchStockData(code);
  },[code])

  useEffect(() => {
    
    const fetchData = () => {
      fetchChartData(code)
      .then((res) => {
        // const code = res.data.name
        
        const data = res.data.series[0].data;
        const seriesdata = res.data.series
        const koreanTimezone = 'Asia/Seoul';
        const lastDataPoint = data[data.length - 1];
        const lastDataPointTime = new Date(lastDataPoint.x).getTime() / 1000 + 32400;
        // const oneYearAgo = lastDataPointTime - 31536000; // 31536000 seconds in a year
        // const initialTime = oneYearAgo;
        const today = new Date();
        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 3);
        const initialTime = sixMonthsAgo.getTime() / 1000;


        const stockdata = data.map((item, index) => {
          return {
            open: item.y[0], high: item.y[1], low: item.y[2], close: item.y[3], time: (new Date(item.x.toLocaleString('en-US', { timeZone: koreanTimezone })).getTime()/1000)+32400
          }
        })
        const volumdata = data.map((item, index) => {
          return {
            time: new Date(item.x).getTime()/1000+32400, value: item.y[4]
          }
        })

        // console.log(stockdata)
        // console.log(volumdata)
    
        candlestickSeries.current.setData(
          stockdata
        );
        volumeSeries.current.setData(
          volumdata
        );

        //marker 설정
        const newsdata = seriesdata[1].data
        const notedata = seriesdata[2].data

        const allMarkers = [];
        const uniqueNewsData = {};
        const uniqueNoteData = {};
        

        newsdata.forEach(item => {
          const dateKey = new Date(item.x).getTime() / 1000+32400;
          if (!uniqueNewsData[dateKey]) {
            uniqueNewsData[dateKey] = item;
          }
        });
        
        notedata.forEach(item => {
          const dateKey = new Date(item.x).getTime() / 1000+32400;
          if (!uniqueNoteData[dateKey]) {
            uniqueNoteData[dateKey] = item;
          }
        });
        
        // console.log(Object.values(uniqueNewsData))

        function isWeekend(date) {
          const day = date.getDay(); 
          return day === 0 || day === 6; // 주말 처리
        }

        Object.values(uniqueNewsData).forEach(item => {
          const date = new Date(item.x);

          if (!isWeekend(date)) {
            allMarkers.push({
              time: date.getTime() / 1000,
              position: 'belowBar',
              color: 'rgba(167, 255, 3, 0.7)',
              shape: 'circle',
              text: 'N',
            });
          }
        });

        Object.values(uniqueNoteData).forEach(item => {
          allMarkers.push({
            time: new Date(item.x).getTime() / 1000,
            position: 'aboveBar',
            color: 'rgba(255, 3, 144, 1)',
            shape: 'circle',
            text: 'R',
            
          });
        });

        allMarkers.sort((a, b) => a.time - b.time);
        candlestickSeries.current.setMarkers(allMarkers);
  

        //tooltip 설정
        tooltipRef.current = document.createElement('div');
        tooltipRef.current.style = `width: auto; max-height: 500px; overflow-y: auto; position: absolute; display: none; box-sizing: border-box; font-size: 14px; text-align: left; z-index: 990; top: 12px; left: 12px; pointer-events: auto; border: 1px solid; border-radius: 2px; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
        tooltipRef.current.style.background = 'rgba( 0, 0, 0, 0.7)';
        tooltipRef.current.style.color = 'white';
        tooltipRef.current.style.borderColor = '#4FE7B0';
        chartContainerRef.current.appendChild(tooltipRef.current);
        chartApiRef.current = chart.current;

        chartApiRef.current.subscribeCrosshairMove((param) => {
            const date = new Date(param.time*1000+32400)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedTime = `${year}-${month}-${day}`;
            
            const newnews = Object.values(uniqueNewsData).some((item) => {
              return item.x === formattedTime;
            });
            const newnote = Object.values(uniqueNoteData).some((item) => {
              return item.x === formattedTime;
            });
            
            if (param.time && [param.seriesData].length && tooltipRef.current){
              tooltipRef.current.style.display = 'block';
              const candledata = param.seriesData.get(candlestickSeries.current);
              const voldata = param.seriesData.get(volumeSeries.current);
              const { open, high, low, close, time } = candledata;
              const { value } = voldata;
              tooltipRef.current.innerHTML = 
              `
              <div style="padding: 6px">
                <div style="color: ${'white'}">
                ${formattedTime}
                </div>
                <div style="font-size: 10px; margin: 4px 0px; paddinf-bottom:4px; color: ${'white'}">
                  <div>시가 : ${open.toLocaleString()}</div>
                  <div>고가 : ${high.toLocaleString()}</div>
                  <div>저가 : ${low.toLocaleString()}</div>
                  <div>종가 : ${close.toLocaleString()}</div>
                  <div>거래량 : ${value.toLocaleString()}</div>
                </div>
              </div>
                `
              let left = param.point.x + 80;
              if (left > chartContainerRef.current.clientWidth - tooltipRef.current.offsetWidth) {
                left = param.point.x - tooltipRef.current.offsetWidth + 200;
              }
              let top = param.point.y + 10;
              tooltipRef.current.style.left = `${left}px`
              tooltipRef.current.style.top = top + 'px';
            } else {
              tooltipRef.current.style.display = 'none';
            }
        });

        chartApiRef.current.timeScale().fitContent();
        

        // 클릭 이벤트 핸들러 함수
        chartContainerRef.current.addEventListener('mouseenter', () => {
          chartContainerRef.current.style.cursor = 'pointer';
        });
        
        // 마우스가 차트 영역을 벗어날 때 포인터 스타일 기본값으로 변경
        chartContainerRef.current.addEventListener('mouseleave', () => {
          chartContainerRef.current.style.cursor = 'default';
        });
        
        
        const handleChartClick = (param) => {
          const date = new Date(param.time*1000+32400)
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const formattedTime = `${year}-${month}-${day}`;
          const newnews = Object.values(uniqueNewsData).some((item) => {
            return item.x === formattedTime;
          });
          const newnote = Object.values(uniqueNoteData).some((item) => {
            return item.x === formattedTime;
          });  
  
          if (!param.point) {
            return;
          } else {
            if (newnote && newnews) {
              notedata.forEach(item => {
                if (item.x == formattedTime) {
                  router.push(`/${code}?tab=notes&newsdate=${formattedTime}&date=${formattedTime}`);
                }
              });
            } else if (newnote) {
              notedata.forEach(item => {
                if (item.x == formattedTime) {
                  router.push(`/${code}?tab=notes&date=${formattedTime}`);
                }
              });
            } else if (newnews) {
              newsdata.forEach(item => {
                if (item.x == formattedTime) {
                  const newsspec = item.y
                  // console.log(newsspec); // 뉴스 제목, URL 출력
                  // 해당 뉴스 보여주기
                  router.push(`/${code}?tab=${tab}&newsdate=${formattedTime}`);
                }
              });
            }
          }
        };
        // chart.current에 클릭 이벤트 핸들러 등록
        chart.current.subscribeClick(handleChartClick);

        chart.current.timeScale().setVisibleRange({
          from: initialTime,
          to: lastDataPointTime,
        });
      
      })
      .catch((err) => {
        console.log(err);
      });
    };
    
    fetchData();

    chart.current = createChart(chartContainerRef.current, {
      layout: {
        textColor: 'white',
        background: { type: 'solid', color: '#00051E' },
        ColorType: 'solid',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.1)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.1)',
        },
      },
      ColorType: 'gradient',
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      localization: {
          dateFormat : 'yyyy-MM-dd'
      },
      rightPriceScale: {
          borderColor: 'rgba(197, 203, 206, 0.7)',
      },
      timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.7)',
      },
    });

    candlestickSeries.current = chart.current.addCandlestickSeries({
      upColor: '#4FE7B0',
      downColor: '#FF4444',
      borderVisible: false,
      wickUpColor: '#4FE7B0',
      wickDownColor: '#FF4444',
    });
    candlestickSeries.current.applyOptions({
      zIndex: 1, 
    });

    volumeSeries.current = chart.current.addHistogramSeries({
      color: 'rgba(0, 128, 128, 0.5)',
      priceScaleId: '',
      priceFormat: {
        type: 'volume',
      },
    });
    volumeSeries.current.applyOptions({
      zIndex: 0, 
    });
      volumeSeries.current.priceScale().applyOptions({
        scaleMargins: {
            top: 0.7, 
            bottom: 0,
        },
    });

     return () => {
      if (chart.current) {
          chart.current.remove();
      }
    };
  // eslint-disable-next-line 
  }, [code]);
  
  useEffect(() => {
    // ... (your existing code)

    // Function to load TradingView widget script
    const loadTradingViewWidget = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "description": "",
              "proName": "KRX:${code}"
            },
            {
              "description": "",
              "proName": "KRX:KOSPI"
            },
            {
              "description": "",
              "proName": "KRX:KOSDAQ"
            },
            {
              "description": "",
              "proName": "FX_IDC:USDKRW"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "regular",
          "locale": "kr"
        }
      `;
      document.querySelector('.tradingview-widget-container__widget').appendChild(script);
    };

    // Call the function to load TradingView widget
    loadTradingViewWidget();

    // ... (your existing code)

  }, [code]);

  return (
    <div>
      <div className='chartheader'>
        <div className='headerinfo'>
          <div className='stockname' onClick={toggleStar}>
            <StockProfile
              stockName=""
              stockId=""
              size="small"
              stockMarket=""
              stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png`}
            />{chartData.name}{isStarred ? <FaStar id='star'/> : <FaRegStar id='star'/>}</div>
          <div className='stockinfo'>

            {/* 여기에 위젯 */}
            <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
        </div>
          </div>

        </div>
        {/* <ValueInfoModal isOpen={isModalOpen} onClose={closeValueInfoModal} />
        <ValueChainModal isOpen={isValueModalOpen} onClose={closeValueChainModal} code={code}/> */}
        {chartData.valuechain ? (
          <div className='valuechain'>
            <div className='value'><ValueStockModal code={code} id='valueinfo1'/></div>
            <div className='value2'><ChartModal id='valueinfo2'/></div>
          </div>
        ) : 
        // 벨류체인 없을때는??
          <div className='valuechain'>
            <div className='value'><ValueStockModal code={code} id='valueinfo1'/></div>
            <div className='value2'><ChartModal id='valueinfo2'/></div>
          </div>
        }

      </div>
      <div className="chartbox">
        <div className="chart">
          <div ref={chartContainerRef} style={{ width: '900px', height: '400px' }}>
          </div>
        </div>
      </div>
      
    </div>
  );
}
