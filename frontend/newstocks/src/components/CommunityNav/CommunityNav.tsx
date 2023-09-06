'use client';
import styles from './CommunityNav.module.css';
import Link from 'next/link';

import { IoIosArrowForward } from "react-icons/io";

export default function CommunityNav() {
  return(
    <div className={styles["communitynav-container"]}>
      <div className={styles["profile-container"]}>
        <div className={styles["profile-box"]}>
          <div className={styles["profile-image"]}></div>
          <div className={styles["profile-name"]}>
            <div>Hello 👋</div>
            <p>Anima Ag.</p>
          </div>
          <div className={styles["profile-button"]}><IoIosArrowForward id={styles["profile-button-icon"]} color="white"/></div>
        </div>
      </div>

      <div className={styles["nav-container"]}>
        <div>
          나의 노트
        </div>

        <div>
          전체 노트
        </div>

        <div>
          공지사항
        </div>
      </div>
    </div>
  )
}