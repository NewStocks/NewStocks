'use client'
import { useState } from 'react'
import styles from './ScrapButton.module.css'

import { FaBookmark, FaRegBookmark } from 'react-icons/fa6'

import { scrapPost, deleteScrapPost } from '@/services/posts'

type Props = {
  status: boolean
  id: string
  count: number
}

export default function ScrapButton({status, id, count}: Props) {
  const [scrap, setScrap] = useState(status)
  const [scrapCount, setScrapCount] = useState(count)
  
  const handleScrap = () => {
    scrapPost(id)
    .then(res => console.log(res))
    .then(() => setScrapCount(scrapCount + 1))
  }

  const handleDeleteScrap = () => {
    deleteScrapPost(id)
    .then(res => console.log(res))
    .then(() => setScrapCount(scrapCount -1))
  }

  return <div className={styles.button}>
          <div className={styles["scrap-count"]}>{scrapCount}</div>
          {scrap ? 
            (<FaBookmark className={styles["scrap-icon"]} id={styles.scrapped} onClick={() => {setScrap(prev => !prev); handleDeleteScrap(id)}}/>)
            : 
            (<FaRegBookmark className={styles["scrap-icon"]} onClick={() => {setScrap(prev => !prev); handleScrap(id)}}/>)
          }
        </div>
}