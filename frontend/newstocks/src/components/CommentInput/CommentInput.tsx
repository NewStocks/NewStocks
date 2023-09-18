'use client';

import styles from './CommentInput.module.css'

type Props = {
  type: 'comment' | 'cocomment',
  func: () => void,
}

export default function CommentInput({ type='comment', func }: Props) {
  return (
    <div className={styles["commentinput-container"]}>
      <div className={styles["writer"]}></div>
      <div className={styles["input-box"]}>
        <textarea placeholder="오답노트에 대한 댓글을 남겨주세요! (300자 이내)&#13;&#10;띄어쓰기는 'shift + Enter'로 입력 가능" />
        <div className={styles["button-box"]}>
          <div className={styles["submit-comment"]}>
            <button onClick={func} className={styles["submit-button"]}>{type=='comment' ? '🧹 초기화' : '🗑 취소'}</button>
          </div>
          <div className={styles["submit-comment"]}>
            <button className={styles["submit-button"]}>✍ 등록하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}