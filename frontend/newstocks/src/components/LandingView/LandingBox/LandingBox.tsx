'use client'
import styles from './landingbox.module.css'
import { useEffect, useState } from 'react';

import Button from '../../Button/Button'
import AllCardsImage from './AllCardsImage/AllCardsImage'

type Props = {
  position: number | 0,
  right: boolean
}

export default function LandingBox({ position, right }: Props) {
  const [ isVisible, setIsVisible ] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY >= position) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      {!right ?  
      <>
        <div className={styles["landing-containers-num"]}>01</div>
        <div className={styles["landing-containers"]}>
          <div className={styles["content-box"]}>
            <div className={`${styles['title']} ${styles['scroll-animation']} ${isVisible ? styles['title-animation-show'] : ''}`}><span>나의</span> 오답노트 모아보기</div>
            <div className={`${styles['description']} ${styles['scroll-animation']} ${isVisible ? styles['description-animation-show'] : ''}`} >
              <div>설명 설명 설명 설명 설명 설명 설명 멋있는 설멍</div>
              <div>나의 오답노트 모아보기</div>
              <div>완전 멋있는 기능 짱 멋있는 기능 진짜 멋있음</div>
              <div>와우 대박 진짜 멋있는 전체 오답노트 모아보기</div>
            </div>
            <div className={`${styles["Button-width"]} ${styles['scroll-animation']} ${isVisible ? styles['button-animation-show'] : ''}`}><Button text="나의노트" highlight={true} kindof="arrow"></Button></div>
          </div>
        </div>
      </>
      : 
      <>
        <div className={`${styles["landing-containers"]} ${styles['scroll-animation']} ${isVisible ? styles['title-animation-show'] : ''}`}>
        <div className={styles["landing-containers-num"]} id={styles["right-num"]}>02</div>
          <div className={styles["landing-iamge-box"]}>
            <AllCardsImage />
          </div>

          <div className={styles["content-box"]} id={styles["right-item"]}>
            <div className={`${styles['title']} ${styles['scroll-animation']} ${isVisible ? styles['title-animation-show'] : ''}`} id={styles["right-desc"]}><span>전체</span> 오답노트 모아보기</div>
            <div className={`${styles["description"]} ${styles['scroll-animation']} ${isVisible ? styles['description-animation-show'] : ''}`} id={styles["right-desc"]}>
              <div>설명 설명 설명 설명 설명 설명 설명 멋있는 설멍</div>
              <div>전체 오답노트 모아보기</div>
              <div>완전 멋있는 기능 짱 멋있는 기능 진짜 멋있음</div>
              <div>와우 대박 진짜 멋있는 전체 오답노트 모아보기</div>
            </div>
            <div id={styles["right-item"]} style={{ width: "120px" }}>
            <div className={`${styles["Button-width"]} ${styles['scroll-animation']} ${isVisible ? styles['button-animation-show'] : ''}`}><Button text="전체노트" kindof="arrow" highlight={false}></Button></div>
            </div>
          </div>
        </div>
      </>
      }
    </>
  )
}