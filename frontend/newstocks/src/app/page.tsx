import './globals.css';
import styles from './page.module.css'
import Link from 'next/link';
import LandingView from '@/components/LandingView/LandingView'
import Footer from '@/components/Footer/Footer'
import Button from '@/components/Button/Button'
import graphimg from '@/assets/graphimg.png'
import Image from 'next/image';

export default function Home() {
  // const router = useRouter();

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
              <Link href="/005930?tab=company">
                <Button text="시작하기" highlight={true} kindof="arrow"></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <LandingView />

      <Footer />
    </div>
  )
}
