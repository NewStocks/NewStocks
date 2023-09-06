"use client"

import styles from "./messageinput.module.css"
import React, { useState } from "react"

export default function MessageInput() {

  const [message, setMessage ] = useState('question'); 

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMessage('question')
  }


  return (
    <div className={styles.container}>
      <textarea name="chatmessage" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <button type="submit" onClick={handleClick}>보내기</button>
    </div>              
  )
}