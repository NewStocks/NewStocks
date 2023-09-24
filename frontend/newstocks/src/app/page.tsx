import './globals.css';
import styles from './page.module.css'
import LandingView from '@/components/LandingView/LandingView'
import Footer from '@/components/Footer/Footer'
import Button from '@/components/Button/Button'

export default function Home() {

  return (
    <div className={styles.main}>
      <div>
        <div className={styles["landing-main-image"]}>
        <svg className={styles["chart"]} viewBox="0 0 600 350">
          <path className={`${styles["line"]} line`} d="M0,250 50,190 100,200 200,250 350,150 400,200 500,100 600,150 700,100" />
        </svg>
        </div>
        <div className={styles["landing-main-container"]}>
          <div className={styles["title-animation"]}>
          <div className={styles["title-mini"]}>100% 주식 오답노트 솔루션 📝</div>
          <div className={styles["title"]}><span>NEWStocks</span> 커뮤니티에서</div> 
          <div className={styles["title"]}><span>주식 오답노트</span>를 공유해보세요</div>
          </div>
          <div className={styles["title-botton-box"]}>
            <div className={styles["Button-width"]}><Button text="공지사항" highlight={true} kindof="arrow"></Button></div>
            <div className={styles["Button-width"]}><Button text="노트작성" highlight={false} kindof="arrow"></Button></div>
          </div>
        </div>
      </div>

      <LandingView />

      <Footer />
    </div>
  )
}
