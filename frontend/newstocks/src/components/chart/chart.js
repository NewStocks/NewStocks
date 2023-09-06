"use client";
import React, { useState, useEffect } from 'react';
// import ApexCharts from 'react-apexcharts';
import './chart.css';
import axios from 'axios';
import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Chart() {

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
        text: '삼성전자 현재가',
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
        data: [
          {
            x: '2014/05/06',
            y: [6629.81, 6650.5, 6623.04, 6633.33, 6000]
          },
          {
            x: '05/07/2014',
            y: [6632.01, 6643.59, 6620, 6630.11]
          },
          {
            x: '05/08/2014',
            y: [6630.71, 6648.95, 6623.34, 6635.65]
          },
          {
            x: '05/09/2014',
            y: [6635.65, 6651, 6629.67, 6638.24]
          },
          {
            x: '05/10/2014',
            y: [6638.24, 6640, 6620, 6624.47]
          },
          {
            x: '05/11/2014',
            y: [6624.53, 6636.03, 6621.68, 6624.31]
          },
          {
            x: '05/12/2014',
            y: [6624.61, 6632.2, 6617, 6626.02]
          },
          {
            x: '05/13/2014',
            y: [6627, 6627.62, 6584.22, 6603.02]
          },
          {
            x: '05/14/2014',
            y: [6605, 6608.03, 6598.95, 6604.01]
          },
          {
            x: '05/15/2014',
            y: [6604.5, 6614.4, 6602.26, 6608.02]
          },
          {
            x: '05/16/2014',
            y: [6608.02, 6610.68, 6601.99, 6608.91]
          },
          {
            x: '05/17/2014',
            y: [6608.91, 6618.99, 6608.01, 6612]
          },
          {
            x: '05/18/2014',
            y: [6612, 6615.13, 6605.09, 6612]
          },
          {
            x: '05/19/2014',
            y: [6612, 6624.12, 6608.43, 6622.95]
          },
          {
            x: '05/20/2014',
            y: [6623.91, 6623.91, 6615, 6615.67]
          },
          {
            x: '05/21/2014',
            y: [6618.69, 6618.74, 6610, 6610.4]
          },
          {
            x: '05/22/2014',
            y: [6611, 6622.78, 6610.4, 6614.9]
          },
          {
            x: '05/23/2014',
            y: [6614.9, 6626.2, 6613.33, 6623.45]
          },
          {
            x: '05/24/2014',
            y: [6623.48, 6627, 6618.38, 6620.35]
          },
          {
            x: '05/25/2014',
            y: [6619.43, 6620.35, 6610.05, 6615.53]
          },
          {
            x: '05/26/2014',
            y: [6615.53, 6617.93, 6610, 6615.19]
          },
          {
            x: '05/27/2014',
            y: [6615.19, 6621.6, 6608.2, 6620]
          },
          {
            x: '05/28/2014',
            y: [6619.54, 6625.17, 6614.15, 6620]
          },
          {
            x: '05/29/2014',
            y: [6620.33, 6634.15, 6617.24, 6624.61]
          },
          {
            x: '05/30/2014',
            y: [6625.95, 6626, 6611.66, 6617.58]
          },
          {
            x: '05/31/2014',
            y: [6619, 6625.97, 6595.27, 6598.86]
          },
          {
            x: '06/01/2014',
            y: [6598.86, 6598.88, 6570, 6587.16]
          },
          {
            x: '06/02/2014',
            y: [6588.86, 6600, 6580, 6593.4]
          },
          {
            x: '06/03/2014',
            y: [6593.99, 6598.89, 6585, 6587.81]
          },
          {
            x: '06/04/2014',
            y: [6587.81, 6592.73, 6567.14, 6578]
          },
          {
            x: '06/05/2014',
            y: [6578.35, 6581.72, 6567.39, 6579]
          },
          {
            x: '06/06/2014',
            y: [6579.38, 6580.92, 6566.77, 6575.96]
          },
          {
            x: '06/07/2014',
            y: [6575.96, 6589, 6571.77, 6588.92]
          },
          {
            x: '06/08/2014',
            y: [6588.92, 6594, 6577.55, 6589.22]
          },
          {
            x: '06/09/2014',
            y: [6589.3, 6598.89, 6589.1, 6596.08]
          },
          {
            x: '06/10/2014',
            y: [6597.5, 6600, 6588.39, 6596.25]
          },
          {
            x: '06/11/2014',
            y: [6598.03, 6600, 6588.73, 6595.97]
          },
          {
            x: '06/12/2014',
            y: [6595.97, 6602.01, 6588.17, 6602]
          },
        ],
      },
      {
        name: '뉴스',
        type: 'scatter',
        data: [
          {
            x: '05/06/2014',
            y: 0
          },
          {
            x: '05/07/2014',
            y: 0
          },
          {
            x: '05/08/2014',
            y: 0
          },
          {
            x: '05/09/2014',
            y: 0
          },
          {
            x: '05/10/2014',
            y: 0
          },
          {
            x: '05/11/2014',
            y: 6638
          },
          {
            x: '05/12/2014',
            y:0
          },
          {
            x: '05/13/2014',
            y: 0
          },
          {
            x: '05/14/2014',
            y: 0
          },
          {
            x: '05/15/2014',
            y: 0
          },
          {
            x: '05/16/2014',
            y: 0
          },
          {
            x: '05/17/2014',
            y: 0
          },
          {
            x: '05/18/2014',
            y: 0
          },
          {
            x: '05/19/2014',
            y: 0
          },
          {
            x: '05/20/2014',
            y: 0
          },
          {
            x: '05/21/2014',
            y: 0
          },
          {
            x: '05/22/2014',
            y: 0
          },
          {
            x: '05/23/2014',
            y:0          
          },
          {
            x: '05/24/2014',
            y: 0
          },
          {
            x: '05/25/2014',
            y: 0
          },
          {
            x: '05/26/2014',
            y: 0
          },
          {
            x: '05/27/2014',
            y: 0         
          },
          {
            x: '05/28/2014',
            y: 0
          },
          {
            x: '05/29/2014',
            y: 0
          },
          {
            x: '05/30/2014',
            y: 6630
          },
          {
            x: '05/31/2014',
            y: 0
          },
          {
            x: '06/01/2014',
            y: 0
          },
          {
            x: '06/02/2014',
            y: 0      
          },
          {
            x: '06/03/2014',
            y: 0
          },
          {
            x: '06/04/2014',
            y: 6595
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
      {
        name: '오답노트',
        type: 'scatter',
        data: [
          {
            x: '05/06/2014',
            y: 0
          },
          {
            x: '05/07/2014',
            y: 0
          },
          {
            x: '05/08/2014',
            y: 0
          },
          {
            x: '05/09/2014',
            y: 0
          },
          {
            x: '05/10/2014',
            y: 0
          },
          {
            x: '05/11/2014',
            y: 6619
          },
          {
            x: '05/12/2014',
            y:0
          },
          {
            x: '05/13/2014',
            y: 0
          },
          {
            x: '05/14/2014',
            y: 0
          },
          {
            x: '05/15/2014',
            y: 0
          },
          {
            x: '05/16/2014',
            y: 0
          },
          {
            x: '05/17/2014',
            y: 0
          },
          {
            x: '05/18/2014',
            y: 0
          },
          {
            x: '05/19/2014',
            y: 0
          },
          {
            x: '05/20/2014',
            y: 0
          },
          {
            x: '05/21/2014',
            y: 0
          },
          {
            x: '05/22/2014',
            y: 0
          },
          {
            x: '05/23/2014',
            y:0          
          },
          {
            x: '05/24/2014',
            y: 0
          },
          {
            x: '05/25/2014',
            y: 0
          },
          {
            x: '05/26/2014',
            y: 0
          },
          {
            x: '05/27/2014',
            y: 0         
          },
          {
            x: '05/28/2014',
            y: 0
          },
          {
            x: '05/29/2014',
            y: 0
          },
          {
            x: '05/30/2014',
            y: 0
          },
          {
            x: '05/31/2014',
            y: 0
          },
          {
            x: '06/01/2014',
            y: 0
          },
          {
            x: '06/02/2014',
            y: 0      
          },
          {
            x: '06/03/2014',
            y: 0
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
      axios
        .get('baseurl/stock/{stock-id}/chart')
        .then((response) => {
          const { series } = response.data.series;
          const { title } = response.data.title;
          setChartData((prevData) => ({
            ...prevData, 
            series,
            title,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const fetchNewVolumeData = () => {
      axios
        .get('baseurl/stock/{stock-id}/chart')
        .then((response) => {
          const { series } = response.data.series;
          const { title } = response.data.title;
          setChartData((prevData) => ({
            ...prevData, // 이전 데이터를 유지한 채 업데이트
            series,
            title,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
    fetchNewVolumeData();
    const intervalId = setInterval(fetchData, 100000);
  
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      <div className="chartbox">
        <div className="chart">
          <ApexCharts
            options={chartData.options}
            series={chartData.series}
            type="scatter"
            width={900}
            height={400}
          />
          <br />
          <ApexCharts
            options={newVolumeData.options}
            series={newVolumeData.series}
            type="line"
            width={900}
            height={150}
          />
          <div id="data-point-info">
          </div>
        </div>
      </div>
    </div>
  );
};


