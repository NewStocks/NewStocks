'use client'
import './chart.css';
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState, useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, LineData, CrosshairMode, ColorType } from 'lightweight-charts';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ValueInfoModal from './ValuechainQuestion';

export default function ChartComponent() {
  const router = useRouter();
  const tabName = usePathname();
  const code = tabName.split('/').filter(Boolean)[0];
  console.log(code)
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const candlestickSeries = useRef(null);
  const tooltipRef = useRef(null);
  // const tooltipRef = useRef(null);
  const chartApiRef = useRef(null);
  const volumeSeries = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 열기 함수
  const openValueInfoModal = () => {
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeValueInfoModal = () => {
    setModalOpen(false);
  };

  const [isStarred, setIsStarred] = useState(false);
  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  const[chartData, setChartData] = useState({
    title:'',
    valuechain: true,
  })

  useEffect(() => {
    
    const fetchData = () => {
      axios({
        method: "get",
        url: `http://localhost:8200/stock/find-chart/${code}`,
      })
      .then((res) => {
        console.log(res.data);
        // const code = res.data.name
        const data = res.data.series[0].data;
        const seriesdata = res.data.series
        const koreanTimezone = 'Asia/Seoul';
        console.log(data)

        setChartData((prevdata) => ({
          ...prevdata,
          title: code
        }))

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

        console.log(stockdata)
        console.log(volumdata)
    
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
        
        console.log(Object.values(uniqueNewsData))
        console.log(Object.values(uniqueNoteData))

        Object.values(uniqueNewsData).forEach(item => {
          
          allMarkers.push({
            time: new Date(item.x).getTime() / 1000,
            position: 'aboveBar',
            color: 'rgba(167, 255, 3, 0.7)',
            shape: 'circle',
            text: 'N',
          });
        });

        Object.values(uniqueNoteData).forEach(item => {
          allMarkers.push({
            time: new Date(item.x).getTime() / 1000,
            position: 'belowBar',
            color: 'rgba(255, 3, 251, 0.7)',
            shape: 'circle',
            text: 'R',
            
          });
        });

        allMarkers.sort((a, b) => a.time - b.time);
        candlestickSeries.current.setMarkers(allMarkers);

        //tooltip 설정
        tooltipRef.current = document.createElement('div');
        tooltipRef.current.style = `width: 150px; max-height: 300px; overflow-y: auto; position: absolute; display: none; box-sizing: border-box; font-size: 14px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: auto; border: 1px solid; border-radius: 2px; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
        tooltipRef.current.style.background = 'rgba( 0, 0, 0, 0.5)';
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
            // console.log(date, formattedTime, )
            if (newnote||newnews) {
              tooltipRef.current.style.display = 'block';
              const candledata = param.seriesData.get(candlestickSeries.current);
              const voldata = param.seriesData.get(volumeSeries.current);
              const { open, high, low, close, time } = candledata;
              const { value } = voldata;

              notedata.forEach(item => {
                if (item.x == formattedTime) {
                  const notespec = item.y[0]
                  tooltipRef.current.innerHTML = 
              `
              <div style="padding: 6px">
                <div style="color: ${'#4FE7B0'}">${code}</div>
                <div style="color: ${'white'}">
                ${formattedTime}
                </div>
                <div style="font-size: 12px; margin: 4px 0px; paddinf-bottom:4px; color: ${'white'}">
                  <div>시가 : ${open}</div>
                  <div>고가 : ${high}</div>
                  <div>저가 : ${low}</div>
                  <div>종가 : ${close}</div>
                  <div>거래량 : ${value}</div>
                </div>
              </div>
              <div style="padding: 6px; border-top:1px solid #4FE7B0;" >
                <div style="font-size: 12px; margin: 4px 0px; paddinf-bottom:4px; color: ${'white'}">
                  <div>뉴스</div>
                  <div>오답노트</div>
                  <div>${notespec}</div>
                </div>
              <div/>
                `

              tooltipRef.current.style.maxHeight = '300px';
              let left = param.point.x + 80;
                if (left > chartContainerRef.current.clientWidth - tooltipRef.current.offsetWidth) {
                  left = param.point.x - tooltipRef.current.offsetWidth + 200;
                }
              let top = param.point.y + 10;

              tooltipRef.current.style.left = `${left}px`
              tooltipRef.current.style.top = top + 'px';
                } 
              });

              newsdata.forEach(item => {
                if (item.x == formattedTime) {
                  const newsnum = newsdata.length
                  tooltipRef.current.innerHTML = 
              `
              <div style="padding: 6px">
                <div style="color: ${'#4FE7B0'}">${code}</div>
                <div style="color: ${'white'}">
                ${formattedTime}
                </div>
                <div style="font-size: 12px; margin: 4px 0px; paddinf-bottom:4px; color: ${'white'}">
                  <div>시가 : ${open}</div>
                  <div>고가 : ${high}</div>
                  <div>저가 : ${low}</div>
                  <div>종가 : ${close}</div>
                  <div>거래량 : ${value}</div>
                </div>
              <div/>
              <div style="padding: 6px; border-top:1px solid #4FE7B0;" >
                <div style="font-size: 12px; margin: 4px 0px; paddinf-bottom:4px; color: ${'white'}">
                  <div>뉴스</div>
                  <div>${newsnum}개의 뉴스가 있습니다</div>
                  <div>오답노트</div>
                </div>
              <div/>
                `

              tooltipRef.current.style.maxHeight = '300px';
              let left = param.point.x + 80;
                if (left > chartContainerRef.current.clientWidth - tooltipRef.current.offsetWidth) {
                  left = param.point.x - tooltipRef.current.offsetWidth + 200;
                }
              let top = param.point.y + 10;

              tooltipRef.current.style.left = `${left}px`
              tooltipRef.current.style.top = top + 'px';
                }
              });
              
            } else if (param.time && [param.seriesData].length && tooltipRef.current){
              tooltipRef.current.style.display = 'block';
              const candledata = param.seriesData.get(candlestickSeries.current);
              const voldata = param.seriesData.get(volumeSeries.current);
              const { open, high, low, close, time } = candledata;
              const { value } = voldata;
              tooltipRef.current.innerHTML = 
              `
              <div style="padding: 6px">
                <div style="color: ${'#4FE7B0'}">${code}</div>
                <div style="color: ${'white'}">
                ${formattedTime}
                </div>
                <div style="font-size: 12px; margin: 4px 0px; paddinf-bottom:4px; color: ${'white'}">
                  <div>시가 : ${open}</div>
                  <div>고가 : ${high}</div>
                  <div>저가 : ${low}</div>
                  <div>종가 : ${close}</div>
                  <div>거래량 : ${value}</div>
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
          } else if (newnote || newnews) {
            notedata.forEach(item => {
              if (item.x == formattedTime) {
                const notespec = item.y
                console.log(notespec); //오답노트 제목, id출력
                //해당 오답노트 보여주기
                router.push(`/${code}?tab=notes`);
              } 
            });
            newsdata.forEach(item => {
              if (item.x == formattedTime) {
                const newsspec = item.y
                console.log(newsspec); //뉴스 제목, url출력
                //해당 뉴스 보여주기
                router.push(`/${code}?tab=news`);
              }
            });
          } 
          console.log(notedata);
        };
        // chart.current에 클릭 이벤트 핸들러 등록
        chart.current.subscribeClick(handleChartClick);
      
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
          color: 'rgba(197, 203, 206, 0.3)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.3)',
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
    


    chart.current.timeScale().fitContent();

     return () => {
      if (chart.current) {
          chart.current.remove();
      }
    };
  }, []);

  // const [isStarred, setIsStarred] = useState(false);
  // const toggleStar = () => {
  //   setIsStarred(!isStarred);
  // };

  // const[chartData, setChartData] = useState({
  //   title:'',
  //   valuechain: true
  // })


  return (
    <div>
      <div className='chartheader'>
        <div className='headerinfo'>
          <div className='stockname' onClick={toggleStar}>{code}{isStarred ? <FaStar id='star'/> : <FaRegStar id='star'/>}</div>
          <div className='stockinfo'>현재가</div>
          <div className='stockinfo'>거래량</div>
          <div className='stockinfo'>국내증시</div>
          <div className='stockinfo'>해외증시</div>
        </div>
        <ValueInfoModal isOpen={isModalOpen} onClose={closeValueInfoModal} />
        {chartData.valuechain ? (
        <div className='valuechain'>
          <div className='value'>밸류 체인</div>
          <div><LiaQuestionCircleSolid onClick={openValueInfoModal} id='valueinfo'/></div>
        </div>
      ) : null}
        
        {/* <div className='valuechain' >
          <div className='value'>밸류 체인</div>
          <div><LiaQuestionCircleSolid id='valueinfo'/></div>
        </div> */}
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
