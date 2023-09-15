import styles from './communitypage.module.css';

import LandingView from '@/components/LandingView/LandingView'
import Button from '@/components/Button/Button'

export default function CommunityPage() {
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
      // 스크롤 이벤트 리스너 추가
      // const handleScroll = () => {
      //     const scrollY = window.scrollY;
      //     // const targetPosition = 100;

      //     if (scrollY >= 0) {
      //         setIsVisible(true);
      //     } else {
      //         setIsVisible(false);
      //     }
      // };

      // window.addEventListener('scroll', handleScroll);

      // return () => {
      //     // window.removeEventListener('scroll', handleScroll);
      // };
  // }, []);
  

  return ( 
    <div className={styles.main}>
      <div>
        <div className={styles["landing-main-image"]}></div>
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

      <div className={styles["footer"]}>
        <div className={styles["footer-contents"]}>
          <div className={styles["footer-box"]}>
            <div className={styles["footer-title"]}><span>NEWStocks</span></div>
            <div className={styles["footer-content"]}>오~ 좋은데</div>
            <div className={styles["footer-content"]}>A210</div>
          </div>

          <div className={styles["footer-box"]}>
            <div className={styles["footer-title"]}><span>뉴스탁스</span>의 새소식</div>
            <div className={styles["Button-width"]}><Button text="공지사항" kindof="arrow" highlight={false}></Button></div>
          </div>


          <div>
            <div className={styles["footer-title"]}>개인정보 보호 및 약관</div>
            <div className={styles["footer-content"]}>개인정보 처리 방침</div>
            <div className={styles["footer-content"]}>서비스 이용 약관</div>
          </div>
        </div>
      </div>
    </div>
  )
}