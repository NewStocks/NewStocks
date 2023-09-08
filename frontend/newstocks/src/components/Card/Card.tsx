'use client';
import styles from './Card.module.css'
import Button from '@/components/Button/Button'

import { BsBookmark } from "react-icons/bs";

export default function Card() {
  return(
    <div className={styles["card-container"]}>

      <div className={styles["title-container"]}>

        <div className={styles["title-left"]}>
          <div className={styles["title"]}>제목</div>
          <div className={styles["stock-info-box"]}>
            <div className={styles["stock-image"]}></div>
            <div className={styles["stock-name"]}>카카오</div>
            <div className={styles["tag-boxes"]}>
              {/* <div className={styles["tag"]}><Button text="#급락"></Button></div> */}
            </div>
          </div>
        </div>

        <div className={styles["title-right"]}>
          <BsBookmark size="22"/>
        </div>
      
      </div>

      <div className={styles["image-container"]}></div>

      <div className={styles["content-container"]}>

      </div>
    </div>
  )
}