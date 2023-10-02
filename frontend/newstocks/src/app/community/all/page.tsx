'use client';
import { useState } from 'react';
import styles from './allpage.module.css';

import Button from '@/components/Button/Button';
import FilterableCards from '@/components/FilterableCards/FilterableCards'
import SearchBox from '@/components/SearchBox/SearchBox'

import { StyledLink } from '@/components/StyledLink/StyledLink'

export default function AllnotesPage() {
  const [stockToggle, setStockToggle] = useState(false)
  
  return (
    <div className={styles.main}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        <div className={styles["page-title"]}>전체노트</div>
        <div className={styles["all-button-box"]}>
          <StyledLink href='/community/all?sort=all'><div>📚전체노트</div></StyledLink>
          <StyledLink href='/community/all?sort=hot'><div>🔥인기노트</div></StyledLink>
          <div>🔎노트검색</div>
        </div>
      </div>

      <div className={styles["cards-container"]}>
        <FilterableCards />
      </div>
    </div>
  )
}