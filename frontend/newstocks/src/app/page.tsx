'use client'
import './globals.css';
import styles from './page.module.css'
import LandingView from '@/components/LandingView/LandingView'
import Footer from '@/components/Footer/Footer'
import graphimg from '@/assets/graphimg.png'
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { getFavoriteStocks } from '@/services/favoriteStocks';
import { getAccessToken } from '@/utils/token';

export default function Home() {

  const handleStartClick = async () => {
    if (!getAccessToken()) {
      window.location.href = '/005930?tab=company';
    }

    const response = await getFavoriteStocks();
    if (response.data.length !== 0) {
      window.location.href = `${response.data[0].stockId}/?tab=company`;
    }
    else {
      window.location.href = '/005930?tab=company';
    }
  };
  
  return (
    <div className={styles.main}>
      <div>
        <div className={styles["landing-main-image"]}>
        <div className={styles["chart"]}>
          <Image
            src={graphimg}
            alt="stockimg"
          />
        </div>
        {/* <svg className={styles["chart"]} viewBox="0 0 600 350">
          <path className={`${styles["line"]} line`} d="M0,250 50,190 100,200 200,250 350,150 400,200 500,100 600,150 700,100" />
        </svg> */}
        </div>
        <div className={styles["landing-main-container"]}>
          <div className={styles["title-animation"]}>
            <div className={styles["title-mini"]}>100% 주식 오답노트 솔루션 📝</div>
            <div className={styles["title-main"]}><span>NEWStocks</span></div> 
            <div className={styles["title"]}><span>주식 뉴스</span> & <span>오답노트</span> 플랫폼</div>
          </div>
          <div className={styles["head-description"]}>
            <div>주식정보, 뉴스, 오답노트까지</div>
            <div>기존에 없던 서비스를 경험해보세요 </div>
          </div>
          <div className={styles["title-botton-box"]}>
            <div className={styles["Button-width"]}>
              <button onClick={handleStartClick} className={styles["button-box"]} style={{ color: "#4FE7B0", border: "2px solid #4FE7B0" }}>
                <div>시작하기</div>
                <HiArrowNarrowRight size="14"/>
              </button>
              {/* <Link href="/005930?tab=company">
                <Button text="시작하기" highlight={true} kindof="arrow"></Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      <LandingView />

      <Footer />
    </div>
  )
}
