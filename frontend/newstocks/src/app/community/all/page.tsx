'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'
import styles from './allpage.module.css';
import Image from 'next/image'

import { Stock } from '@/types/stock' 
import { fetchStockInfo } from '@/services/chart'

import Button from '@/components/Button/Button';
import FilterableCards from '@/components/FilterableCards/FilterableCards'
import SearchBox from '@/components/SearchBox/SearchBox'

import { RiCloseFill } from 'react-icons/ri'
import { BiSearch, BiX } from "react-icons/bi";
import { StyledLink } from '@/components/StyledLink/StyledLink'

export default function AllnotesPage() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [stockToggle, setStockToggle] = useState(true)
  const [stockInfo, setStockInfo] = useState<Stock | null>(null)
  const [keyword, setKeyword] = useState<string | null>(null)
  const [currFilter, setCurrFilter] = useState<string | null>('find-all')
  // const [type, setType] = useState<string>('find-all')
  const [key, setKey] = useState<string | null>('find-all')
  // const [keyStatus, setKeyStatus] = useState<boolean>(false)

  useEffect(() => {
    const getItem = searchParams.get('filter')
    setCurrFilter(getItem)

    const hasKeyword = searchParams.has('key')
    // setKeyStatus(hasKeyword)
    if (hasKeyword) {
      const getKey = searchParams.get('key')
      setKey(getKey)
      if (getItem==='find-stock' && getKey) {
        fetchStockInfo(getKey)
        .then(res => setStockInfo({'id': res.data.id, 'name': res.data.name}))
      }
    }
  }, [])

  const handleStock = (stock: Stock) => {
    router.push(`/community/all?filter=find-stock&key=${stock.id?.trim()}`)
  }

  const handleSearchKeyword = () => {
    if (!keyword?.trim()) {
      alert('검색어를 입력해주세요!')
    } else {
      router.push(`/community/all?filter=find-keyword&key=${keyword?.trim()}`)
    }
  }

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleSearchKeyword()
    }
  }
  
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
          <StyledLink href='/community/all?filter=find-hot'>
            <div className={currFilter==="find-hot" ? styles["selected-filter"] : styles["filter"]}>🔥인기노트</div>
          </StyledLink>
          {!stockToggle ?
          (<><div className={styles["stock-box"]}>
            <SearchBox searchFunc={handleStock} />
          </div>
          <div title="종목검색 닫기" onClick={() => setStockToggle(prev=>!prev)} className={styles["stock-close"]}><RiCloseFill className={styles["close-icon"]} size={21}/></div></>)
          : !stockInfo ?
          (<div className={currFilter==="find-stock" ? styles["selected-filter"] : styles["filter"]} onClick={() => setStockToggle(prev=>!prev)}>📈종목검색</div>)
          : (<div className={styles["selected-stock-box"]}>
          <div className={styles["selected-stock"]}>
            <Image
              src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stockInfo.id}.png`}
              alt="member profile image"
              width="25"
              height="25"
              className={styles["stock-img"]}
              />
            <div className={styles["stock-name"]}>{stockInfo.name}</div>
            <div className={styles["stock-id"]}>{stockInfo.id}</div>
          </div>
          <button className={styles["search-stock-button"]} onClick={() => {setStockInfo(null); setStockToggle(prev=>!prev)} }>주식 검색</button>
        </div>)
        }
          </div>

          {/* {!stockToggle ? ( */}
          <div className={styles["search-keyword-box"]}>
            <BiSearch className={styles["search-icon"]} size={22}/>
            <input type="text" placeholder="'키워드'로 노트 검색" defaultValue={currFilter==="find-keyword" ? `${key}` : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} onKeyPress={handleKeyPress}/>
            <div className={styles["submit-button"]} onClick={() => handleSearchKeyword()}>검색</div>
          </div>
          {/* ):( */}
          {/* <div onClick={() => setStockToggle(prev=>!prev)}><BiSearch className={styles["search-icon"]} size={22}/></div> */}
          {/* )} */}

          
        </div>
      </div>

      <div className={styles["cards-container"]}>
        <FilterableCards type={currFilter} key={key}/>
      </div>
    </div>
  )
}