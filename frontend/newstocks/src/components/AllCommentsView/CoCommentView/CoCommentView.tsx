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
          <div>Anima Ag.</div>
          <div>23.08.30</div>
        </div>

        <div className={styles["content"]}>
          plz
        </div>

        <div className={styles["icons"]}>
          <div><FaRegThumbsUp size="20"/><p>12</p></div>
        </div>
      </div>

    </div>
  )
}