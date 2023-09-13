'use client';
import styles from './CommentView.module.css';

import { FaRegThumbsUp } from 'react-icons/fa'
import { BiCommentDots } from 'react-icons/bi'

export default function CommentView() {
  return (
    <div className={styles["comment-container"]}>

      <div className={styles["profile"]}>
        <div className={styles["profile-img"]}></div>
        <div>Anima Ag.</div>
        <div>23.08.30</div>
      </div>

      <div className={styles["content"]}>
        댓글 부탁해요~
      </div>

      <div className={styles["icons"]}>
        <div><FaRegThumbsUp size="20"/><p>12</p></div>
        <div><BiCommentDots size="23"/><p>대댓글 작성하기</p></div>
      </div>

    </div>
  );
}