'use client';
import styles from './LikeStocktab.module.css';
import { useState } from 'react';
import Link from 'next/link';


import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaStar } from "react-icons/lia";

export default function LikeStockTab() {
    const [addtoggle, setAddtoggle] = useState(false);
  return(
    <div className={styles["liketab-container"]}>
      <div className={styles["like-container"]}>
        <div className={styles["liketab-title"]}>관심 종목</div>  
        <div className={styles["like-button"]} onClick={() => setAddtoggle((prev) => !prev)}>종목 추가<IoIosAddCircleOutline id={styles["like-button-icon"]}/></div>
        <div className={styles["like-button"]} style={{ display: addtoggle ? "block" : "none" }}>
          <div className={styles["like-search"]}>
              <input type="text" placeholder="종목명 또는 종목코드를 입력하세요" />
          </div>
        </div>
      </div>

      <div className={styles["like-content"]}>
          <p>???</p>
      </div>
    </div>
  )
}