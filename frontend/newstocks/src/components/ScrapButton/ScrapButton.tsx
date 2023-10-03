'use client'
import { useState, useEffect } from 'react'
import styles from './ScrapButton.module.css'

import { FaBookmark, FaRegBookmark } from 'react-icons/fa6'

import { scrapPost, deleteScrapPost } from '@/services/posts'

type Props = {
  status: boolean
  id: string
  count: number
  detail?: boolean
  handleChange?: () => void
}

export default function ScrapButton({status, id, count, detail, handleChange}: Props) {
  const [scrap, setScrap] = useState<boolean>(status)
  const [scrapCount, setScrapCount] = useState<number>(count)

  // useEffect(() => {
  //   setScrap(status)
  //   setScrapCount(count)
  // }, [count])

  const handleScrap = () => {
    scrapPost(id)
    .then(res => {})
    .then(() => setScrapCount(scrapCount + 1))
  }

  const handleDeleteScrap = () => {
    deleteScrapPost(id)
    .then(res => {})
    .then(() => {
      setScrapCount(scrapCount -1);
    })
  }

  return <div className={styles.button}>
          <div className={styles["scrap-count"]}>{scrapCount}{detail && <span>명이 스크랩했습니다</span>}</div>
          {!scrap ? 
            (<FaRegBookmark className={styles["scrap-icon"]} onClick={() => {setScrap(prev => !prev); handleScrap()}}/>)
          :
          (<FaBookmark className={styles["scrap-icon"]} id={styles.scrapped} onClick={() => {setScrap(prev => !prev); handleDeleteScrap();}}/>)
          }
        </div>
}