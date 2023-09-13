'use client';

import styles from './noticepage.module.css';

import styled from 'styled-components'
import Link from 'next/link';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export default function NoticePage() {
  return (
    <div className={styles["main"]}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        <div className={styles["page-title"]}>공지사항</div>
      </div>

      <div className={styles["notice-container"]}>
        <hr />

        <div className={styles["notice"]}>
          <div className={styles["title-box"]}>
            <div className={styles["highlight"]}>공지</div>
            <div className={styles["title"]}><StyledLink href="/community/1">서버 점검 안내 (8/31)</StyledLink></div>
          </div>
          <div className={styles["time"]}>23.09.13 16:56</div>
        </div>

        <div className={styles["notice"]}>
          <div className={styles["title-box"]}>
            <div className={styles["highlight"]}>공지</div>
            <div className={styles["title"]}>오류 수정 공지 (9/11)</div>
          </div>
          <div className={styles["time"]}>23.09.13 16:56</div>
        </div>

        <div className={styles["notice"]}>
          <div className={styles["title-box"]}>
            <div className={styles["highlight"]} id={styles["update"]}>업데이트</div>
            <div className={styles["title"]}>v1.2.1 업데이트 안내 (8/31) </div>
          </div>
          <div className={styles["time"]}>23.09.13 16:56</div>
        </div>

      </div>
    </div>
  )
}