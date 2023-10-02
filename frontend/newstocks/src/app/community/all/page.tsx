'use client';
import { useState } from 'react';
import styles from './allpage.module.css';

import Button from '@/components/Button/Button';
import FilterableCards from '@/components/FilterableCards/FilterableCards'
import SearchBox from '@/components/SearchBox/SearchBox'

export default function AllnotesPage() {
  const [stockToggle, setStockToggle] = useState(false)
  
  return (
    <div className={styles.main}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        <div className={styles["page-title"]}>전체노트</div>
        <div className={styles["all-button-box"]}>
          {/* <div className={styles["sort-button-box"]}>
            <div className={styles["sorted-Button-width"]}><Button text="🔥인기노트" kindof="sorted" highlight={false}></Button></div>
            <div className={styles["search-Button-width"]} onClick={() => setStockToggle(prev=>!prev)}><Button text=" 🔎 종목선택" highlight={false}></Button></div>
            <SearchBox searchFunc={() => {}}/>
          </div>
          <div className={styles["sorted-Button-width"]} id={styles["ordered"]}><Button text="최신순" kindof="sorted" highlight={false}></Button></div> */}
        </div>
      </div>

      <div className={styles["cards-container"]}>
        <FilterableCards />
      </div>
    </div>
  )
}