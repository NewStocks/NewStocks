'use client';
import Image from 'next/image'
import styles from './StockInfo.module.css'
import { StyledLink } from '../StyledLink/StyledLink'

import { FaChartSimple } from 'react-icons/fa6'

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
        <Image
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${id}.png`}
          alt="member profile image"
          width="32"
          height="26"
          className={styles["stock-img"]}
        />
        <div className={styles["stock-name"]}>{name}</div>
        <div className={styles["stock-id"]}>{id}</div>

      </div>
      <StyledLink href={`/${id}?tab=company`}>
        <button className={styles["move-to-chart"]}>
          <FaChartSimple size={21} className={styles["chart-icon"]}/>
          <div>차트로 이동</div>
        </button>
      </StyledLink>

      {/* <div className={styles["second-box"]}>
        <div className={styles["stock-info"]}>코스피</div>
        <div className={styles["upper-case"]} id={styles["KOSPI"]}>48,650</div>
        <div className={styles["upper-case"]}>+ 1.35%</div>
        <div className={styles["upper-case"]}>▲400</div>
      </div>

      <div className={styles["third-box"]}>
        <div className={styles["stock-info"]}>거래량 885,468</div>
        <div className={styles["stock-info"]}>거래대금 434억 115만</div>
      </div> */}
    </div>
  )
}