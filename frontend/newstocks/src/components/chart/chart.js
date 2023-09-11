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

  const [chartData, setChartData] = useState({
    options: {
      stacked: true,
      theme: {
        mode: "dark",
      },
      chart: {
        zoom: {
          enabled: true,
          type: 'xy',
          autoScaleYaxis: true
        },
        toolbar:{
          autoSelected: 'pan',
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            customIcons: [
              {
                icon: '<img src="/static/icons/chart-carpet.png" width="20">',
                index: 4,
                title: 'tooltip of the icon',
                class: 'custom-icon',
                click: function (chart, options, e) {
                  // console.log(options.config.yaxis[0].min+10000)
                  // console.log(options.config.xaxis.min+86400000)
                  const xmin = options.config.xaxis.min + 86400000*14 
                  // const xminchange = xmin.getFullYear() + "/" + (xmin.getMonth()+1) + "/" + xmin.getDate()
                  // console.log(xminchange)
                  setChartData((prevData) => ({
                    ...prevData,
                    options: {
                      ...prevData.options,
                      yaxis: {
                        ...prevData.options.yaxis,
                        min: options.config.yaxis[0].min+2000,
                        max: options.config.yaxis[0].max-2000, 
                      },
                      xaxis: {
                        ...prevData.options.xaxis,
                        min: xmin, 
                        // max: options.config.xaxis.max - 86400000, 
                      },
                    }, 
                  }));
                  console.log(options)
                }
              },
              {
                icon: '<img src="/static/icons/chart-carpet.png" width="20">',
                index: 5,
                title: 'tooltip of the icon',
                class: 'custom-icon',
                click: function (chart, options, e) {
                  const xmin = options.config.xaxis.min - 86400000*14
                  setChartData((prevData) => ({
                    ...prevData,
                    options: {
                      ...prevData.options,
                      yaxis: {
                        ...prevData.options.yaxis,
                        min: options.config.yaxis[0].min-2000,
                        max: options.config.yaxis[0].max+2000, 
                      },
                      xaxis: {
                        ...prevData.options.xaxis,
                        min: xmin, 
                        // max: options.config.xaxis.max - 86400000, 
                      },
                    }, 
                  }));
                  // console.log(options)
                }
              }
            ]
          },
        },
        type: 'scatter',
        height: 350,
        background: '#00051E',
        foreColor: '#fff',
        events: {
          dataPointSelection: function(event, chartContext, config) {        
          const index = config.dataPointIndex
          const stockdata = config.w.config.series[0].data[index]
          // const newsdata = config.w.config.series[1].data[index]
          // newsdata.url = "https://finance.naver.com/item/news.naver?code=005930";
          // const notedata = config.w.config.series[2].data[index]
          console.log(index)
          console.log(config.w.config.series[0].data[index])

          const infoContainer = document.getElementById('data-point-info'); 
          infoContainer.innerHTML = `<div><주식 데이터></div>`;
          infoContainer.innerHTML += `<div>시가 : ${JSON.stringify(stockdata.y[0])}</div>`;
          infoContainer.innerHTML += `<div>고가 : ${JSON.stringify(stockdata.y[1])}</div>`;
          infoContainer.innerHTML += `<div>저가 : ${JSON.stringify(stockdata.y[2])}</div>`;
          infoContainer.innerHTML += `<div>종가 : ${JSON.stringify(stockdata.y[3])}</div>`;
          infoContainer.innerHTML += `<div>거래량 : ${JSON.stringify(stockdata.y[4])}</div>`;
          if (newsdata.y !== 0) {
            const newsdata = config.w.config.series[1].data[index]
            newsdata.url = "https://finance.naver.com/item/news.naver?code=005930";
            infoContainer.innerHTML += `<div>뉴스 데이터: ${JSON.stringify(newsdata.x)} 뉴스가 존재</div> <a href="${newsdata.url}" target="_blank">뉴스 보기</a>`;
          }
          if (notedata.y !== 0) {
            const notedata = config.w.config.series[2].data[index]
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
        text: ``,
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        min: new Date('2023-06-01').getTime(),
        // max: new Date('2023-08-01').getTime(),
        // range: 10000000000,
        labels: {
          style: {
            colors: '#fff'
          }
        },
      },
      yaxis: {
        forceNiceScale: true,
        // showAlways: true,
        opposite: true,
        min: 50000,
        max: 82000,
        logarithmic: false,
        labels: {
          style: {
            colors: '#fff'
          }
        },
        crosshairs: {
          show: true,
          position: 'front',
          stroke: {
              color: '#b6b6b6',
              width: 1,
              dashArray: 3,
          },
        },
        tooltip: {
          enabled: true,
          offsetX: 0,
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
          autoSelected: 'pan',
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
      // title: {
      //   text: '거래량(단위:만)',
      //   align: 'left',
      //   margin: 0
      // },
      xaxis: {
        type: 'datetime',
        min: new Date('2023-06-01').getTime(),
        // max: new Date('2023-08-01').getTime(),
        // range: 10000000000,
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
        // min: 1000,
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
          content += `<div class="tooltip-label">${seriesData.x}</div><hr>`;
          content += `<div class="tooltip-value">거래량: ${seriesData.y}만</div>`;

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
        const data = res.data.series[0].data;
        let maxY1 = Number.MIN_VALUE;
        let minY2 = Number.MAX_VALUE;

        const processedData = data.map((item) => {
          const y1Value = item.y[1]; // y[1] 값
          const y2Value = item.y[2]; // y[2] 값
          maxY1 = Math.max(maxY1, y1Value);
          minY2 = Math.min(minY2, y2Value);
        });

        // console.log(maxY1,minY2);

        const stock = res.data.name
        setChartData((prevData) => ({
          ...prevData,
          options: {
            ...prevData.options,
            yaxis: {
              ...prevData.options.yaxis,
              min: minY2,
              max: maxY1, 
            },
            title: {
              text: stock
            }
          }, 
          series: 
          [{
            ...prevData.series,
            name:'stock',
            type:'candlestick',
            data:res.data.series[0].data
          },
          {...prevData.series,
            name:'news',
            type:'scatter',
            data:[
              {
                x:'2023/05/05',
                y: 77000
              },
              {
                x:'2023/05/06',
                y: 77000
              }
          ]
          },
          {...prevData.series,
            name:'오답노트',
            type:'scatter',
            data:[]}
        ]
        }));
      })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchNewVolumeData = () => {
      axios({
        method: "get",
        url: "http://localhost:8080/stock/find-chart/005930",
        })
        .then((response) => {
          const data = response.data.series[0].data;
          console.log(data)
          const processedData = data.map((item) => {
            return {
              x: item.x, // x 값은 그대로 유지
              y: Math.floor(item.y[4]/10000) // y 값은 5번째 데이터(거래량)만 사용
            };
          });
          console.log(processedData)
          setNewVolumeData((prevData) => ({
            ...prevData, 
            series: [
              {
                ...prevData.series[0],
                data: processedData,
              },
            ],
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
    fetchNewVolumeData();
    // const intervalId = setInterval(fetchData, 100000);
  
    // return () => clearInterval(intervalId);
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



