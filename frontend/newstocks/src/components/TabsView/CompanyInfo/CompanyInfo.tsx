'use client'
import styles from "./CompanyInfo.module.css";
import StockProfile from "@/components/StockProfile/StockProfile";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { fetchStockInfo} from '@/services/chart';

type StockItem = {
  id: string
  name: string
  marketCap: number
  listedShares: number,
  foreignShares: number,
  foreignPercent: number,
  stockMarket: number,
  delisting: boolean,
  sector: string
}
function formatNumber(amount: number) {
  if (amount >= 1e12) {
    return (amount / 1e12).toFixed(1) + '조';
  } else if (amount >= 1e8) {
    return (amount / 1e8).toFixed(1) + '천억';
  } else if (amount >= 1e4) {
    return (amount / 1e4).toFixed(1) + '억';
  } else {
    return amount.toString();
  }
}

export default function CompanyInfo() {
  const tabName = usePathname() || '';
  const code = tabName.split('/').filter(Boolean)[0];
  
  const[stockData, setStockData] = useState<StockItem | null>(null);

  useEffect(() => {
    const fetchData = () => {
      fetchStockInfo(code)
        .then((res) => {
          // const date = new Date(res.data[0].publishTime).getTime()
          const stockData: StockItem = res.data;
          setStockData(stockData)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();

  }, [code]);

  if (stockData === null) {
    // stockData가 null인 경우 로딩 상태 처리
    return <div>Loading...</div>;
  }
  

  return (
    <>
      <div className={styles["company-info-wrapper"]}>
        <div className={styles["stock-profile-wrapper"]}>
          <StockProfile
            stockName={stockData.name}
            stockId={code}
            stockMarket="코스피"
            stockImageUrl={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${code}.png`}
          />
        </div>
        <div className={styles["hr"]}></div>
        <div className={styles["company-detail-wrapper"]}>

          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>시가총액</div>
            <div className={styles["company-detail-content"]}>{formatNumber(stockData.marketCap)}</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>상장주식수</div>
            <div className={styles["company-detail-content"]}>{formatNumber(stockData.listedShares)} 주</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>외국인 보유 주식수</div>
            <div className={styles["company-detail-content"]}>{formatNumber(stockData.foreignShares)} 주</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>외국인 비중</div>
            <div className={styles["company-detail-content"]}>{formatNumber(stockData.foreignPercent)}%</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>산업군</div>
            <div className={styles["company-detail-content"]}>{stockData.sector}</div>
          </div>
        </div>
      </div>
    </>
  );
}
