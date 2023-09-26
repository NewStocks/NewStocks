'use client';

import styles from './StockInfo.module.css'

type Props = {
  stock: {
    id: string
    name: string
  }
}

export default function StockInfo({ stock: { id, name } }: Props) {
  return (
    <div className={styles["stock-box"]}>
      <div className={styles["first-box"]}>
        <div className={styles["stock-img"]}></div>
        <div>{name}</div>
        <div className={styles["stock-info"]}>{id}</div>
      </div>

      <div className={styles["second-box"]}>
        <div className={styles["stock-info"]}>코스피</div>
        <div className={styles["upper-case"]} id={styles["KOSPI"]}>48,650</div>
        <div className={styles["upper-case"]}>+ 1.35%</div>
        <div className={styles["upper-case"]}>▲400</div>
      </div>

      <div className={styles["third-box"]}>
        <div className={styles["stock-info"]}>거래량 885,468</div>
        <div className={styles["stock-info"]}>거래대금 434억 115만</div>
      </div>
    </div>
  )
}