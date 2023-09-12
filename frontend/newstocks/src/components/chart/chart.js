'use client'
import './chart.css';
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { FaRegStar, FaStar } from "react-icons/fa";
import React, { useState, useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, LineData, CrosshairMode, ColorType } from 'lightweight-charts';
import axios from 'axios';

export default function ChartComponent() {
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const candlestickSeries = useRef(null);
  const tooltipRef = useRef(null);
  const chartApiRef = useRef(null);
  const volumeSeries = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      axios({
        method: "get",
        url: "http://localhost:8080/stock/find-chart/005930",
      })
      .then((res) => {
        console.log(res.data);
        const code = res.data.name
        const data = res.data.series[0].data;
        console.log(data)
        const stockdata = data.map((item, index) => {
          if (index<=494) {
            return {
              open: item.y[0], high: item.y[1], low: item.y[2], close: item.y[3], time: new Date(item.x).getTime()/1000
            }
          } else if (495<index<499){
            return {
              open: item.y[0], high: item.y[1], low: item.y[2], close: item.y[3], time: new Date(item.x).getTime()/1000+64072000
            }
          } else {
            return {
              open: item.y[0], high: item.y[1], low: item.y[2], close: item.y[3], time: new Date(item.x).getTime()/1000
            }
          }
        })

        const volumdata = data.map((item, index) => {
          if (index<=494) {
            return {
              time: new Date(item.x).getTime()/1000, value: item.y[4]
            }
          } else if (495<index<499){
            return {
              time: new Date(item.x).getTime()/1000+64072000, value: item.y[4]
            }
          } else {
            return {
              time: new Date(item.x).getTime()/1000, value: item.y[4]
            }
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
        // chart.current.timeScale().fitContent();
        
        tooltipRef.current = document.createElement('div');
        tooltipRef.current.style = `width: 130px; height: 130px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 14px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
        tooltipRef.current.style.background = 'rgba( 0, 0, 0, 0.5)';
        tooltipRef.current.style.color = 'white';
        tooltipRef.current.style.borderColor = '#4FE7B0';
        // tooltipRef.current.className = 'custom-tooltip'; // CSS 클래스를 정의해야 합니다.

        chartContainerRef.current.appendChild(tooltipRef.current);

        chartApiRef.current = chart.current;

        // Crosshair 이벤트 핸들러를 등록하여 툴팁을 업데이트합니다.
        chartApiRef.current.subscribeCrosshairMove((param) => {
          if (
            param.point === undefined ||
            !param.time ||
            param.point.x < 0 ||
            param.point.x > chartContainerRef.current.clientWidth ||
            param.point.y < 0 ||
            param.point.y > chartContainerRef.current.clientHeight
          ) {
            tooltipRef.current.style.display = 'none';
          } else {
            const date = new Date(param.time*1000)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedTime = `${year}-${month}-${day}`;
            tooltipRef.current.style.display = 'block';
            const candledata = param.seriesData.get(candlestickSeries.current);
            const voldata = param.seriesData.get(volumeSeries.current);
            // console.log(formattedTime, date)
            const { open, high, low, close, time } = candledata;
            const { value } = voldata;
            tooltipRef.current.innerHTML = 
            `
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
              `
            // console.log(param.point.x)
            let left = param.point.x + 80;
            if (left > chartContainerRef.current.clientWidth - tooltipRef.current.offsetWidth) {
              left = param.point.x - tooltipRef.current.offsetWidth + 200;
            }
 
            let top = param.point.y + 10;
            // if (top > chartContainerRef.current.clientHeight - tooltipRef.current.offsetHeight) {
            //   top = param.point.y - tooltipRef.current.offsetHeight - 10;
            // }

            tooltipRef.current.style.left = `${left}px`
            tooltipRef.current.style.top = top + 'px';
          }
        });
        chartApiRef.current.timeScale().fitContent();
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

    volumeSeries.current = chart.current.addHistogramSeries({
      color: 'rgba(0, 128, 128, 0.5)',
      priceScaleId: '',
      priceFormat: {
        type: 'volume',
      },
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

  const [isStarred, setIsStarred] = useState(false);
  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  const[chartData, setChartData] = useState()

  return (
    <div>
      <div className='chartheader'>
        <div className='headerinfo'>
          <div className='stockname' onClick={toggleStar}>삼성전자{isStarred ? <FaStar id='star'/> : <FaRegStar id='star'/>}</div>
          <div className='stockinfo'>현재가</div>
          <div className='stockinfo'>거래량</div>
          <div className='stockinfo'>국내증시</div>
          <div className='stockinfo'>해외증시</div>
        </div>
        <div className='valuechain'>
          <div className='value'>밸류 체인</div>
          <div><LiaQuestionCircleSolid id='valueinfo'/></div>
          
        </div>
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
