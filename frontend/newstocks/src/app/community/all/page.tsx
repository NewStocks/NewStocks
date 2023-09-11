import styles from './allpage.module.css';

import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';

export default function AllnotesPage() {
  return (
    <div className={styles.main}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        <div className={styles["page-title"]}>전체노트</div>
        <div className={styles["all-button-box"]}>
          <div className={styles["sort-button-box"]}>
            <div className={styles["sorted-Button-width"]}><Button text="🔥인기노트" kindof="sorted" highlight={false}></Button></div>
            <div className={styles["sorted-Button-width"]}><Button text=" 🔎 종목선택" kindof="sorted" highlight={false}></Button></div>
          </div>
          <div className={styles["sorted-Button-width"]} id={styles["ordered"]}><Button text="최신순" kindof="sorted" highlight={false}></Button></div>
        </div>
      </div>

      <div className={styles["cards-container"]}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}