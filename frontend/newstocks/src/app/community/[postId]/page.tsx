import styles from "./detailpage.module.css";

import Button from "@/components/Button/Button";
import AllCommentsView from "@/components/AllCommentsView/AllCommentsView";
import StockInfo from "@/components/StockInfo/StockInfo";
import CommentInput from "@/components/CommentInput/CommentInput";

import { IoIosArrowBack } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";

type Props = {
  params: {
    postId: string | undefined;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function DetailnotePage({ params }: Props) {
  const createComment = () => {}

  if (params.postId) {
    return (
      <div className={styles.main}>
        <div className={styles["detail-back"]}>
          <button>
            <IoIosArrowBack size="23" />
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
              <BsBookmark size="20" />
            </div>
          </div>
  
          <div className={styles["detail-subheader"]}>
            <div className={styles["title"]}>여기가 제목 영역입니다</div>
  
            <div className={styles["sub-Buttons"]}>
              <div>
                <Button text="수정하기" highlight={true} kindof="" />
              </div>
              <div>
                <Button text="삭제하기" highlight={true} kindof="" />
              </div>
            </div>
          </div>
  
          <div className={styles["stock-box"]}>
            <StockInfo />
          </div>
  
          <div className={styles["tag-box"]}>
            <div>#우량주</div>
            <div>#급매</div>
          </div>
  
          <div className={styles["content-box"]}>
            <div className={styles["img"]}></div>
            <div className={styles["content"]}>
              카카오 국민주라더니 명성을 뒤로하고 맥없이 흔들리네. 주가 놀라워서
              말이 나오지 않는 상황.{" "}
            </div>
          </div>
        </div>
  
        <div className={styles["icons-container"]}>
          <div>
            <BiCommentDetail className={styles["icons"]} size="23" />
            <p>15</p>
          </div>
          <div>
            <AiOutlineStar className={styles["icons"]} size="23" />
            <p>15</p>
          </div>
          <div>
            <AiOutlineShareAlt className={styles["icons"]} size="23" />
          </div>
        </div>
  
        <div className={styles["commentinput-container"]}>
          <CommentInput type="comment" func={createComment}/>
        </div>
  
        <div className={styles["commentview-container"]}>
          <AllCommentsView />
        </div>
      </div>
    );
  }
}
