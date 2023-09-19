'use client'
import styles from "./CompanyInfo.module.css";
import StockProfile from "@/components/StockProfile/StockProfile";

export default function CompanyInfo() {
  return (
    <>
      <div className={styles["company-info-wrapper"]}>
        <div className={styles["stock-profile-wrapper"]}>
          <StockProfile
            stockName="카카오"
            stockId="035720"
            stockMarket="코스피"
            stockImageUrl="https://file.alphasquare.co.kr/media/images/stock_logo/kr/035720.png"
          />
        </div>
        <div className={styles["hr"]}></div>
        <div className={styles["company-detail-wrapper"]}>
          <p>종합정보</p>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>시가총액</div>
            <div className={styles["company-detail-content"]}>21조 3,510억</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>상장주식수</div>
            <div className={styles["company-detail-content"]}>444,351,090주</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>외국인 보유 주식수</div>
            <div className={styles["company-detail-content"]}>115,879,970주</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>외국인 비중</div>
            <div className={styles["company-detail-content"]}>26.29%</div>
          </div>
          <div className={styles["company-detail"]}>
            <div className={styles["company-detail-title"]}>산업군</div>
            <div className={styles["company-detail-content"]}>미디어</div>
          </div>
        </div>
      </div>
    </>
  );
}
