'use client';
import styles from './CommunityNav.module.css';
import { useState } from 'react';
import Link from 'next/link';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function CommunityNav() {
  const [mytoggle, setMytoggle] = useState(false);

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
        <div className={styles["nav-mynote"]}>
          <p>나의 노트</p>
          <p onClick={() => setMytoggle((prev) => !prev)}><IoIosArrowDown className={styles["nav-mynote-arrow"]}/></p>
        </div>
        <ul className={styles["nav-mynote-toggle"]} style={{ display: mytoggle ? "block" : "none" }}>
          <li>나의 노트</li>
          <li>스크랩 노트</li>
          <li>팔로잉 노트</li>
        </ul>

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