'use client';
import styles from './CoCommentView.module.css';

import { FaRegThumbsUp } from 'react-icons/fa'
import { BiCommentDots } from 'react-icons/bi'
import { PiArrowElbowDownRightBold } from 'react-icons/pi'

export default function CoCommentView() {
  return (
    <div className={styles["comment-container"]}>
      <div className={styles["left"]}>
        {/* <PiArrowElbowDownRightBold size="22"/> */}
      </div>
      <hr />

      <div className={styles["right"]}>
        <div className={styles["profile"]}>
          <div className={styles["profile-img"]}></div>
          <div className={styles["profile-name"]}>Anima Ag.</div>
          <div className={styles["time"]}>23.08.30 11:41</div>
        </div>

        <div className={styles["content"]}>
          <div className={styles["replying-to"]}>Replying to <span>Anima Ag.</span></div>
          <div>plz</div>
        </div>

        <div className={styles["icons"]}>
          <div><FaRegThumbsUp size="20"/><p>12 Likes</p></div>
        </div>
      </div>

    </div>
  )
}