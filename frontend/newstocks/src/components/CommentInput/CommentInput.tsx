"use client";
import styles from "./CommentInput.module.css";
import { useState } from "react";

type Props = {
  id: string
  type: "comment" | "cocomment";
  handleComment?: (id: string, comment: string) => void;
  handleToggle?: () => void;
};

export default function CommentInput({ id, type, handleComment, handleToggle }: Props) {
  const [commentInput, setCommentInput] = useState("")
  const handleCommentFunction = () => {
    if(handleComment) {
      const comment = commentInput;
      console.log(id, comment)
      handleComment(id, comment);
      setCommentInput("");
      
      const textarea = document.getElementById('my-textarea') as HTMLInputElement | null;
      if (textarea) {
        textarea.value = ''
    }
    }
  }

  const handleReset = () => {
    const textarea = document.getElementById('my-textarea') as HTMLInputElement | null;
    if (textarea) {
      textarea.value = ''
    }
  }

  return (
    <div className={styles["commentinput-container"]}>
      <div className={styles["writer"]}></div>
      <div className={styles["input-box"]}>
        <textarea
          placeholder="오답노트에 대한 댓글을 남겨주세요! (300자 이내)&#13;&#10;띄어쓰기는 'shift + Enter'로 입력 가능"
          onChange={(e) => setCommentInput(e.target.value)}
          id="my-textarea"
        />
        <div className={styles["button-box"]}>
          <div className={styles["submit-comment"]}>
            <button onClick={type==="cocomment" ? handleToggle: handleReset} className={styles["submit-button"]}>{type=='comment' ? '🧹 초기화' : '🗑 취소'}</button>
          </div>
          <div className={styles["submit-comment"]}>
            <button className={styles["submit-button"]} onClick={type==="comment" ? handleCommentFunction : () => {}}>✍ 등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
