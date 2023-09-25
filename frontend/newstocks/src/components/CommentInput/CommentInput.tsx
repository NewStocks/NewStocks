"use client";
import styles from "./CommentInput.module.css";
import { useState } from "react";

type Props = {
  id: string
  type: "comment" | "cocomment";
  func?: (id: string, comment: string) => void;
  toggle?: () => void;
};

export default function CommentInput({ id, type, func, toggle }: Props) {
  const [commentInput, setCommentInput] = useState("")
  const handleComment = () => {
    if(func) {
      const comment = commentInput;
      setCommentInput("");
      func(id, comment);
    }
  }

  const handleToggle = () => {
    if (toggle) {
      toggle()
    }
  }
  
  return (
    <div className={styles["commentinput-container"]}>
      <div className={styles["writer"]}></div>
      <div className={styles["input-box"]}>
        <textarea
          placeholder="오답노트에 대한 댓글을 남겨주세요! (300자 이내)&#13;&#10;띄어쓰기는 'shift + Enter'로 입력 가능"
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <div className={styles["button-box"]}>
          <div className={styles["submit-comment"]}>
            <button onClick={type==="cocomment" ? () => {handleToggle} : () => {}} className={styles["submit-button"]}>{type=='comment' ? '🧹 초기화' : '🗑 취소'}</button>
          </div>
          <div className={styles["submit-comment"]}>
            <button className={styles["submit-button"]} onClick={type==="comment" ? () => {handleComment} : () => {}}>✍ 등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
