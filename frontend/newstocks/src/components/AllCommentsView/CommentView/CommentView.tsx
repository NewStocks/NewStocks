'use client';
import styles from './CommentView.module.css';
import { useState } from 'react'

import { FaRegThumbsUp } from 'react-icons/fa'
import { BiCommentDots } from 'react-icons/bi'

import CommentInput from '@/components/CommentInput/CommentInput'

export default function CommentView() {
  const [cocommentToggle, setcocommentToggle] = useState(false);
  function handleToggle() {
    setcocommentToggle((prev) => !prev)
  }

  return (
    <>
    <div className={styles["comment-container"]}>

      <div className={styles["profile"]}>
        <div className={styles["profile-img"]}></div>
        <div className={styles["profile-name"]}>Anima Ag.</div>
        <div className={styles["time"]}>23.08.30 11:41</div>
      </div>

      <div className={styles["content"]}>
        댓글 부탁해요~
      </div>

      <div className={styles["icons"]}>
        <div id={styles["like"]}><FaRegThumbsUp size="20"/><p>12 Likes</p></div>
        <div id={styles["cocomment"]} onClick={() => setcocommentToggle(true)}><BiCommentDots size="23"/><p>대댓글</p></div>
      </div>

    </div>
    {cocommentToggle && <div className={styles["cocomment-box"]}>
      <hr/>
      <div className={styles["cocomment-input"]}><CommentInput type='cocomment' func={handleToggle}/></div>
    </div>}
    </>
  );
}