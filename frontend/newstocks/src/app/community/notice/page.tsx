'use client';

import styles from './noticepage.module.css';

import styled from 'styled-components'
import Link from 'next/link';
import { StyledLink } from '@/components/StyledLink/StyledLink'

export default function NoticePage() {
  return (
    <div className={styles["main"]}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        <div className={styles["page-title"]}>공지사항</div>
      </div>

      <div className={styles["notice-container"]}>
        <StyledLink href={"/community/notice/1"}>
          <div className={styles["notice"]}>환영합니다! 뉴스와 차트를 한번에, <span>NEWStocks</span>!</div>
        </StyledLink>
        <div className={styles["time"]}>23-10-05</div>
        {/*<div className={styles["notice"]}>*/}
        {/*  <div className={styles["title-box"]}>*/}
        {/*    <div className={styles["highlight"]}>공지</div>*/}
        {/*    <div className={styles["title"]}><StyledLink href="/notice/find-detail/10">NEWStocks 1차 배포 공지 안내</StyledLink></div>*/}
        {/*  </div>*/}
        {/*  <div className={styles["time"]}>23.10.02 12:00</div>*/}
        {/*</div>*/}

        {/*<div className={styles["notice"]}>*/}
        {/*  <div className={styles["title-box"]}>*/}
        {/*    <div className={styles["highlight"]}>공지</div>*/}
        {/*    <div className={styles["title"]}>오류 수정 공지 (9/11)</div>*/}
        {/*  </div>*/}
        {/*  <div className={styles["time"]}>23.09.13 16:56</div>*/}
        {/*</div>*/}

        {/*<div className={styles["notice"]}>*/}
        {/*  <div className={styles["title-box"]}>*/}
        {/*    <div className={styles["highlight"]} id={styles["update"]}>업데이트</div>*/}
        {/*    <div className={styles["title"]}>v1.2.1 업데이트 안내 (8/31) </div>*/}
        {/*  </div>*/}
        {/*  <div className={styles["time"]}>23.09.13 16:56</div>*/}
        {/*</div>*/}

      </div>
    </div>
  )
}