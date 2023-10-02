'use client'
import styles from './LikeButton.module.css'
import { useEffect, useState } from 'react'

export default function LikeButton() {
  const [likeStatus, setLikeStatus] = useState(false)

  const toggleLike = () => {
    setLikeStatus(!likeStatus)
  }

  return (
    <>
    </>
  )
}