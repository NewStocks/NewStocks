'use client';
import styles from './landingfooter.module.css'
import { useEffect, useState } from 'react';

import Button from '../Button/Button'

export default function LandingFooter() {
  const [ isVisible, setIsVisible ] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY >= 1300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <>
      <div className={`${styles["footer"]} ${styles['scroll-animation']} ${isVisible ? styles['footer-animation-show'] : ''}`}>
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

    </>
  )
}