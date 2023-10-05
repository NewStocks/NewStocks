import styles from './logo.module.css'
import Logoimg from '@/assets/logo.png'
import Image from 'next/image';

export default function Logo() {
  return (
    <div className={styles["LOGO"]}>
      <Image
          className={styles["header-logo"]}
          src={Logoimg}
          alt="Logoimg"
          width="25"
        />
      <div className={styles["logo-title"]}>
        <div id={styles["main-title"]}>NEWStocks</div>
        <div id={styles["sub-title"]}>STOCK NEWS AND REVIEW</div>
      </div>
    </div>
  )
}