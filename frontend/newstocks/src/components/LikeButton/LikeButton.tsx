'use client'
import styles from './LikeButton.module.css'
import { useState } from 'react'
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs"
import { likePost, deleteLikePost } from "@/services/posts"

type Props = {
  status: boolean
  id: string
  count: number
  detail?: boolean
}

export default function LikeButton({status, id, count, detail}: Props) {
  const [likeStatus, setLikeStatus] = useState(status)
  const [likeCount, setLikeCount] = useState(count)

  const handleLike = () => {
    likePost(id)
    .then(res => {})
    .then(() => setLikeCount(likeCount + 1))
  }

  const handleDeleteLike = () => {
    deleteLikePost(id)
    .then(res => {})
    .then(() => setLikeCount(likeCount -1))
  }

  return (
    <div className={styles.button}>
      <div className={styles.count}>{likeCount}{detail && <span>명이 좋아합니다.</span>}</div>
      {likeStatus ? 
        (<BsHandThumbsUpFill className={styles["icons"]} size="20" id={styles.liked} onClick={() => {setLikeStatus(prev => !prev); handleDeleteLike()}}/>)
        : 
        (<BsHandThumbsUp className={styles["icons"]} size="20" onClick={() => {setLikeStatus(prev => !prev); handleLike()}}/>)
      }
    </div>
  )
}