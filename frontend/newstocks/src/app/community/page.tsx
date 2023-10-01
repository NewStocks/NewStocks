'use client';
import { useEffect } from 'react';
import Image from 'next/image'
import styles from './communitypage.module.css';

import LandingView from '@/components/LandingView/LandingView'
import LandingFooter from '@/components/LandingView/LandingFooter/LandingFooter'
import Button from '@/components/Button/Button'

import communityLanding from '../../../public/community-landing.png';

export default function CommunityPage() {

  return ( 
    <div className={styles.main}>
      <div>
        <div className={styles["landing-main-container"]}>
          <div className={styles["title-main-container"]}>
            <div className={styles["title-animation"]}>
              <div className={styles["title-mini"]}>100% 주식 오답노트 솔루션 📝</div>
              <div className={styles["title"]}><span>NEWStocks</span> 커뮤니티에서</div> 
              <div className={styles["title"]}><span>주식 오답노트</span>를 공유해보세요</div>
            </div>
            <div className={`${styles["sub-title-container"]} ${styles["title-animation"]}`}>
              <div>주식 오답노트 작성으로 나의 투자 기록을 회고하고</div>
              <div>다양한 투자기록을 참고해보세요!</div>
            </div>
            <div className={styles["title-botton-box"]}>
              <div className={styles["Button-width"]}><Button text="나의노트" highlight={true} kindof="arrow"></Button></div>
              <div className={styles["Button-width"]}><Button text="노트작성" highlight={false} kindof="arrow"></Button></div>
            </div>
          </div>

          <Image
          src={communityLanding}
          alt="note image"
          className={`${styles["landing-main-image"]} ${styles["title-animation"]}`}
          height={410}
          />
        </div>
      </div>

      {/* <LandingView />   */}

      <LandingFooter />

    </div>
  )
}