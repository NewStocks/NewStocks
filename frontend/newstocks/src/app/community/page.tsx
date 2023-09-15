import styles from './communitypage.module.css';
import Button from '@/components/Button/Button'

export default function CommunityPage() {
  return ( 
    <div className={styles.main}>
      <div>
        <div className={styles["landing-main-image"]}></div>
        <div className={styles["landing-main-container"]}>
          <div className={styles["title-mini"]}>100% 주식 오답노트 솔루션 📝</div>
          <div className={styles["title"]}><span>NEWStocks</span> 커뮤니티에서</div> 
          <div className={styles["title"]}><span>주식 오답노트</span>를 공유해보세요</div>
          <div className={styles["title-botton-box"]}>
            <div className={styles["Button-width"]}><Button text="공지사항" highlight={true} kindof="arrow"></Button></div>
            <div className={styles["Button-width"]}><Button text="노트작성" highlight={false} kindof="arrow"></Button></div>
          </div>
        </div>
      </div>

      <div className={styles["landing-containers-num"]}>01</div>
      <div className={styles["landing-containers"]}>
        <div className={styles["content-box"]}>
          <div className={styles["title"]}><span>나의</span> 오답노트 모아보기</div>
          <div className={styles["description"]}>
            <div>설명 설명 설명 설명 설명 설명 설명 멋있는 설멍</div>
            <div>나의 오답노트 모아보기</div>
            <div>완전 멋있는 기능 짱 멋있는 기능 진짜 멋있음</div>
            <div>와우 대박 진짜 멋있는 전체 오답노트 모아보기</div>
          </div>
          <div className={styles["Button-width"]}><Button text="나의노트" highlight={true} kindof="arrow"></Button></div>
        </div>
      </div>

      <div className={styles["landing-containers-num"]} id={styles["right-num"]}>02</div>
      <div className={styles["landing-containers"]}>
        <div className={styles["content-box"]} id={styles["right-item"]}>
          <div className={styles["title"]} id={styles["right-desc"]}><span>전체</span> 오답노트 모아보기</div>
          <div className={styles["description"]} id={styles["right-desc"]}>
            <div>설명 설명 설명 설명 설명 설명 설명 멋있는 설멍</div>
            <div>전체 오답노트 모아보기</div>
            <div>완전 멋있는 기능 짱 멋있는 기능 진짜 멋있음</div>
            <div>와우 대박 진짜 멋있는 전체 오답노트 모아보기</div>
          </div>
          <div id={styles["right-item"]} style={{ width: "120px" }}>
          <div className={styles["Button-width"]}><Button text="전체노트" kindof="arrow" highlight={false}></Button></div>
          </div>
        </div>
      </div>
        

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