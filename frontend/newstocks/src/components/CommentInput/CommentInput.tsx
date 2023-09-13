'use client';

import styles from './CommentInput.module.css'
import Button from '../Button/Button'

export default function CommentInput() {
  return (
    <div className={styles["commentinput-container"]}>
      <textarea placeholder="오답노트에 대한 댓글을 남겨주세요!" />
      <div className={styles["submit-comment"]}><Button text="댓글 등록" highlight={false} kindof=""/></div>
    </div>
  )
}