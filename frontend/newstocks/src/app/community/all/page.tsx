'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import styles from './allpage.module.css';

import Button from '@/components/Button/Button';
import FilterableCards from '@/components/FilterableCards/FilterableCards'
import SearchBox from '@/components/SearchBox/SearchBox'

import { RiCloseFill } from 'react-icons/ri'
import { BiSearch, BiX } from "react-icons/bi";
import { StyledLink } from '@/components/StyledLink/StyledLink'

export default function AllnotesPage() {
  const searchParams = useSearchParams()
  const [stockToggle, setStockToggle] = useState(true)
  const [stockInfo, setStockInfo] = useState(null)
  const [currFilter, setCurrFilter] = useState<string | null>(null)

  useEffect(() => {
    const getItem = searchParams.get('filter')
    setCurrFilter(getItem)
  }, [])
  
  return (
    <div className={styles.main}>
      <div>
        <div className={styles["upper-title"]}>커뮤니티</div>
        <div className={styles["page-title"]}>전체노트</div>
        <div className={styles["all-button-box"]}>
          <div className={styles["all-buttons"]}>
          <StyledLink href='/community/all?filter=find-all'>
            <div className={currFilter==="find-all" ? styles["selected-filter"] : styles["filter"]}>📚전체노트</div>
          </StyledLink>
          <StyledLink href='/community/all?filter=find-hot'><div className={styles["filter"]}>🔥인기노트</div></StyledLink>
          {stockToggle ?
          (<div className={styles["filter"]} onClick={() => setStockToggle(prev=>!prev)}>📈종목검색</div>)
          : (<>
          <div className={styles["stock-box"]}>
            <SearchBox searchFunc={setStockInfo} />
          </div>
          <div title="종목검색 닫기" onClick={() => setStockToggle(prev=>!prev)} className={styles["stock-close"]}><RiCloseFill className={styles["close-icon"]} size={21}/></div>
          </>
          )
          }
          </div>

          <div className={styles["search-keyword-box"]}>
            <BiSearch className={styles["search-icon"]} size={25}/>
            <input type="text" placeholder="'키워드'로 노트 검색"/>
          </div>
          
        </div>
      </div>

      <div className={styles["cards-container"]}>
        <FilterableCards />
      </div>
    </div>
  )
}