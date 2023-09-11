import styles from './detailpage.module.css'

import Button from '@/components/Button/Button'
import AllCommentsView from '@/components/AllCommentsView/AllCommentsView'

import { IoIosArrowBack } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineStar } from "react-icons/ai"
import { AiOutlineShareAlt } from "react-icons/ai"

type Props = {
  params: {
    id: string,
  }
  searchParams: {
    [key: string]: string | string[] | undefined 
  }
}

export default function DetailnotePage({ params, searchParams, }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles["detail-back"]}>
        <button>
          <IoIosArrowBack size="23"/>
          <div>뒤로가기</div>
        </button>
      </div>

      <div className={styles["content-container"]}>
        <div className={styles["detail-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["profile"]}>
              <div className={styles["profile-img"]}></div>
              <div className={styles["profile-name"]}>Anima Ag.</div>
            </div>
            <div className={styles["time"]}>23.08.30 11:41</div>
          </div>

          <div className={styles["header-right"]}>
            <div>스크랩하기</div>
            <BsBookmark size="20"/>
          </div>
        </div>

        <div className={styles["detail-subheader"]}>
          <div className={styles["title"]}>여기가 제목 영역입니다</div>

          <div className={styles["sub-Buttons"]}>
            <div><Button text="수정하기" highlight={true} kindof=""/></div>
            <div><Button text="삭제하기" highlight={true} kindof=""/></div>
          </div>
        </div>
        {/* 여기 use client 컴포넌트로 따로 관리 */}
        <div className={styles["stock-box"]}>
          <div className={styles["stock-box-first"]}>
            <div className={styles["profile-img"]}></div>
            <div>카카오</div>
            <div>035720</div>
          </div>

          <div>
            <div>코스피</div>
            <div>48,650</div>
            <div>+ 1.35%</div>
            <div>▲400</div>
          </div>

          <div>
            <div>거래량 885,468</div>
            <div>거래대금 434억 115만</div>
          </div>
        </div>

        <div>
          <div>#우량주</div>
          <div>#급매</div>
        </div>


        <div>
          <div>content-img</div>
          <div>카카오 국민주라더니 명성을 뒤로하고 맥없이 흔들리네. 주가 놀라워서 말이 나오지 않는 상황. </div>
        </div>
      </div>

      <div>
        <div><BiCommentDetail className={styles["icons"]} size="21"/><p>15</p></div>  
        <div><AiOutlineStar className={styles["icons"]} size="21"/><p>15</p></div>
        <div><AiOutlineShareAlt className={styles["icons"]} size="21"/></div>
      </div>

      <div>
        <input type="text" placeholder="오답노트에 대한 댓글을 남겨주세요!" />
        <Button text="댓글 등록" highlight={false} kindof=""/>
      </div>

      <div>
        <AllCommentsView />
      </div>
    </div>
  )
}