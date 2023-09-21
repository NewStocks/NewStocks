import styles from './cardsample.module.css'

import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineStar } from "react-icons/ai"
import { AiOutlineShareAlt } from "react-icons/ai"

export default function CardSample() {
  return (
    <div className={styles["card-container"]} id={styles["landing-container"]}>
      <div className={styles["image-container"]}></div>

      <div className={styles["title-container"]}>
        <div className={styles["title-left"]}>
          <div className={styles["stock-box"]}>
            <div className={styles["stock-img"]}></div>
            <div className={styles["stock-name"]}>카카오</div>
          </div>
          <div className={styles["title"]}>
            여기가 제목 영역입니다.
          </div>
        </div>

        <div className={styles["title-right"]}>
          <BsBookmark size="17"/>
        </div>
      </div>
      
      <div className={styles["content-container"]}>
        <div className={styles["content"]}>카카오 국민주라더니 명성을 뒤로하고 맥없이 흔들리네. 주가 놀라워서 말이 나오지 않는 상황. </div>
      </div>

      <div className={styles["content-bottom-container"]}> 
        <div className={styles["profile-container"]}>
          <div className={styles["stock-img"]}></div>
          <div className={styles["profile-name"]}>Anima Ag.</div>
        </div>

        <div className={styles["time"]}>23.08.30 11:41</div>
      </div>

      <div className={styles["bottom-container"]}>
        <div className={styles["tag-container"]}>
          <div>#우량주</div>
          <div>#급매</div>
        </div>
        <div className={styles["icons-container"]}>
          <div><BiCommentDetail className={styles["icons"]} size="16"/><p>15</p></div>
          <div><AiOutlineStar className={styles["icons"]} size="16"/><p>15</p></div>
          <div><AiOutlineShareAlt className={styles["icons"]} size="16"/></div>
        </div>
      </div>
    </div>
  )  
}