"use client";
import React, { useState, useEffect } from 'react';
// import ApexCharts from 'react-apexcharts';
import './chart.css';
import axios from 'axios';
import dynamic from 'next/dynamic'
import { title } from 'process';
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { FaRegStar, FaStar } from "react-icons/fa";
import Valuequestion from '@/components/chart/ValuechainQuestion'

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart() {

  const stock = '???'

  const [chartData, setChartData] = useState({
    options: {
      theme: {
        mode: "dark",
      },
      chart: {
        toolbar:{
          autoSelected: 'pan'
        },
        
        type: 'scatter',
        height: 350,
        background: '#00051E',
        foreColor: '#fff',
        events: {
          dataPointSelection: function(event, chartContext, config) {        
          const index = config.dataPointIndex
          const stockdata = config.w.config.series[0].data[index]
          const newsdata = config.w.config.series[1].data[index]
          newsdata.url = "https://finance.naver.com/item/news.naver?code=005930";
          const notedata = config.w.config.series[2].data[index]
          console.log(index)
          console.log(config.w.config.series[0].data[index])

          const infoContainer = document.getElementById('data-point-info'); // 정보를 표시할 컨테이너 요소
          infoContainer.innerHTML = `<div><주식 데이터></div>`;
          infoContainer.innerHTML += `<div>시가 : ${JSON.stringify(stockdata.y[0])}</div>`;
          infoContainer.innerHTML += `<div>고가 : ${JSON.stringify(stockdata.y[1])}</div>`;
          infoContainer.innerHTML += `<div>저가 : ${JSON.stringify(stockdata.y[2])}</div>`;
          infoContainer.innerHTML += `<div>종가 : ${JSON.stringify(stockdata.y[3])}</div>`;
          infoContainer.innerHTML += `<div>거래량 : ${JSON.stringify(stockdata.y[4])}</div>`;
          if (newsdata.y !== 0) {
            infoContainer.innerHTML += `<div>뉴스 데이터: ${JSON.stringify(newsdata.x)} 뉴스가 존재</div> <a href="${newsdata.url}" target="_blank">뉴스 보기</a>`;
          }
          if (notedata.y !== 0) {
            infoContainer.innerHTML += `<div>오답노트 데이터: ${JSON.stringify(notedata.x)} 오답노트 존재</div>`;
          }
          }
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        floating: false,
        fontSize: '12px',
      },
      title: {
        text: `${stock}`,
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#fff'
          }
        },
        zoom: {
          enabled: true,
        },
      },
      yaxis: {
        forceNiceScale: true,
        showAlways: true,
        opposite: true,
        min: 6550,
        labels: {
          style: {
            colors: '#fff'
          }
        },
      },
      tooltip: {
        intersect: false,
        enabled: true,
        shared: true,
        followCursor: false,
        inverseOrder: false,
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const seriesData = w.config.series[seriesIndex].data[dataPointIndex];
          let content = '<div class="custom-tooltip">';

          if (seriesIndex === 0) { // Check if it's the 'stocks' series
            
            content += `<div class="tooltip-label">${seriesData.x}</div><hr>`;
            content += `<div class="tooltip-value">시가: &nbsp;&nbsp; ${seriesData.y[0]}</div>`;
            content += `<div class="tooltip-value">고가: &nbsp;&nbsp; ${seriesData.y[1]}</div>`;
            content += `<div class="tooltip-value">저가: &nbsp;&nbsp; ${seriesData.y[2]}</div>`;
            content += `<div class="tooltip-value">종가: &nbsp;&nbsp; ${seriesData.y[3]}</div>`;
            content += `<div class="tooltip-value">거래량: ${seriesData.y[4]}</div>`;
          } else if (seriesIndex === 1) {
            content += `<div class="tooltip-label">${seriesData.x}</div><hr>`;
            content += `<div>뉴스가 있습니다</div>`;
          } else {
            content += `<div class="tooltip-label">${seriesData.x}</div><hr>`;
            content += `<div>오답노트가 있습니다</div>`;
          }

          return content;
        },
      },
      grid: {
        show: true, 
        borderColor: 'rgba(144, 164, 174, 0.5)',
        xaxis: {
          lines: {
              show: true
            }
          },   
          yaxis: {
              lines: {
                  show: true
              }
          },  
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#4FE7B0',
            downward: '#FF4444'
          }
        }
      },
    },
    series: [
      {
        name: 'stocks',
        type: 'candlestick',
        data: []
      },
      {
        name: '뉴스',
        type: 'scatter',
        data: []
      },
      {
        name: '오답노트',
        type: 'scatter',
        data: []
      },
    ],
  });

  const [newVolumeData, setNewVolumeData] = useState({
    options: {
      theme: {
        mode: "dark",
      },
      chart: {
        toolbar:{
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
      },
        type: 'bar',
        height: 350,
        background: '#00051E',
        foreColor: '#fff',
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        floating: false,
        fontSize: '12px',
      },
      title: {
        text: '거래량',
        align: 'left',
        margin: 0
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#fff'
          }
        },
        zoom: {
          enabled: true,
        },
      },
      yaxis: {
        forceNiceScale: true,
        showAlways: true,
        opposite: true,
        min: 1000,
        labels: {
          style: {
            colors: '#fff'
          }
        },
      },
      tooltip: {
        intersect: false,
        enabled: true,
        shared: true,
        followCursor: false,
        inverseOrder: false,
      },
      grid: {
        show: true, 
        borderColor: 'rgba(144, 164, 174, 0.5)',
        xaxis: {
          lines: {
              show: true
            }
          },   
          yaxis: {
              lines: {
                  show: true
              }
          },  
      },
      plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 0,
            borderRadiusApplication: 'around',
            borderRadiusWhenStacked: 'last',
            columnWidth: '80%',
            barHeight: '70%',
        }
    }
    },
    series: [
      {
        name: '거래량',
        type: 'bar',
        data: [
          {
            x: '05/06/2014',
            y: 1000
          },
          {
            x: '05/07/2014',
            y: 5000.05
          },
          {
            x: '05/08/2014',
            y: 8000
          },
          {
            x: '05/09/2014',
            y: 8000
          },
          {
            x: '05/10/2014',
            y: 8000
          },
          {
            x: '05/11/2014',
            y: 8000
          },
          {
            x: '05/12/2014',
            y: 8000          
          },
          {
            x: '05/13/2014',
            y: 3000
          },
          {
            x: '05/14/2014',
            y: 8000
          },
          {
            x: '05/15/2014',
            y: 4000
          },
          {
            x: '05/16/2014',
            y: 8000
          },
          {
            x: '05/17/2014',
            y: 8000
          },
          {
            x: '05/18/2014',
            y: 7000
          },
          {
            x: '05/19/2014',
            y: 8000
          },
          {
            x: '05/20/2014',
            y: 8000
          },
          {
            x: '05/21/2014',
            y: 2000
          },
          {
            x: '05/22/2014',
            y: 4000
          },
          {
            x: '05/23/2014',
            y: 8000         
          },
          {
            x: '05/24/2014',
            y: 8000
          },
          {
            x: '05/25/2014',
            y: 8000
          },
          {
            x: '05/26/2014',
            y: 8000
          },
          {
            x: '05/27/2014',
            y: 8000         
          },
          {
            x: '05/28/2014',
            y: 8000
          },
          {
            x: '05/29/2014',
            y: 8000
          },
          {
            x: '05/30/2014',
            y: 8000
          },
          {
            x: '05/31/2014',
            y: 8000
          },
          {
            x: '06/01/2014',
            y: 8000
          },
          {
            x: '06/02/2014',
            y: 8000      
          },
          {
            x: '06/03/2014',
            y: 8000
          },
          {
            x: '06/04/2014',
            y: 6565
          },
          {
            x: '06/05/2014',
            y: 0
          },
          {
            x: '06/06/2014',
            y: 0
          },
          {
            x: '06/07/2014',
            y: 0
          },
          {
            x: '06/08/2014',
            y: 0
          },
          {
            x: '06/09/2014',
            y: 0
          },
          {
            x: '06/10/2014',
            y: 0          
          },
          {
            x: '06/11/2014',
            y: 0
          },
          {
            x: '06/12/2014',
            y: 0
          },
        ],
      },
    ]
  });


  useEffect(() => {
    const fetchData = () => {
      axios({
        method: "get",
        url: "http://localhost:8080/stock/find-chart/005930",
      })
        .then((res) => {
          console.log(res.data);
          const series  = res.data.series;
          console.log(series)
          Chart.updateSeries([{
            name:'ss',
            data: series
          }])

          // setChartData((prevData) => ({
          //   ...prevData, 
          //   series: series,
          // }));
        })
        .catch((err) => {
          console.log(err);
        });
      // axios
      //   .get(`/stock/find-chart/005930`)
      //   .then((response) => {
      //     console.log(response)
          // const { data } = response.data.series.data;
          // const { text } = response.data.title;
          // setChartData((prevData) => ({
          //   ...prevData, 
          //   ...series,
          //   data,
          // }));
          // setChartData((prevData) => ({
          //   ...prevData, 
          //   ...options,
          //   ...title,
          //   text,
          // }));
          // setChartData({
          //   ...chartData,
          //   series: series, 
          //   options: {
          //     ...chartData.options,
          //     ...options, 
          //   },
          //   title: {
          //     ...chartData.title,
          //     text: title, 
          //   },
          // });
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
    };
    // const fetchNewVolumeData = () => {
    //   axios
    //     .get('baseurl/stock/{stock-id}/chart')
    //     .then((response) => {
    //       const { data } = response.data.series.data;
    //       setChartData((prevData) => ({
    //         ...prevData, 
    //         ...series,
    //         data
    //       }));
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    fetchData();
    // fetchNewVolumeData();
    const intervalId = setInterval(fetchData, 100000);
  
    return () => clearInterval(intervalId);
  }, []); 


  // 관심종목 추가
  const [isStarred, setIsStarred] = useState(false);
  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  // const [showModal, setShowModal] = useState(false)
  // const clickModal = () => setShowModal(!showModal)

  return (
    <div>
      <div className='chartheader'>
        <div className='headerinfo'>
          <div className='stockname' onClick={toggleStar}>{chartData.options.title.text}{isStarred ? <FaStar id='star'/> : <FaRegStar id='star'/>}</div>
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
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="scatter"
            width={900}
            height='400vh'
          />
          <ApexCharts
            options={newVolumeData.options}
            series={newVolumeData.series}
            type="line"
            width={900}
            height='150vh'
          />
          <div id="data-point-info">
          </div>
        </div>
      </div>

    </div>
  );
};



