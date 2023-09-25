"use client";
import styles from "./CommentInput.module.css";
import { useState, useEffect } from "react";

type Props = {
  id: string
  postId?: string
  type: "comment" | "cocomment" | "update"
  content?: string
  CreateCommentApi?: (id: string, comment: string) => void;
  handleToggle?: () => void;
  handleUpdateToggle?: () => void;
  UpdateCommentApi?: (postId: string, comment: string, commentId: string) => void;
};

export default function CommentInput({ id, postId, type, content, CreateCommentApi, handleToggle, UpdateCommentApi, handleUpdateToggle }: Props) {
  const [commentInput, setCommentInput] = useState("")

  useEffect(() => {
    if (type==="update") {
      const textarea = document.getElementById(`my-textarea-${id}`) as HTMLInputElement | null;
      if (textarea) {
        textarea.value = `${content}`
      }
    }
  }, [])

  // 댓글 생성 관리
  const handleComment = () => {
    if(CreateCommentApi) {
      const comment = commentInput;
      CreateCommentApi(id, comment);
      setCommentInput("");

      handleReset()
  }}

  // 댓글 수정 관리
  const handleUpdate = () => {
    const comment = commentInput;
    if (!comment) {
      alert('변경 내용이 없습니다!')
    } else {
      if (UpdateCommentApi && handleUpdateToggle && postId) {
        UpdateCommentApi(postId, comment, id);
        handleUpdateToggle();
        setCommentInput("");
  
        handleReset()
      }
    }
  }

  // 댓글 초기화 관리
  const handleReset = () => {
    const textarea = document.getElementById(`my-textarea-${id}`) as HTMLInputElement | null;
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
          id={`my-textarea-${id}`}
        />
        <div className={styles["button-box"]}>
          <div className={styles["submit-comment"]}>
            <button onClick={type==="comment" ? handleReset : type==="cocomment" ? handleToggle : handleUpdateToggle} className={styles["submit-button"]}>{type=='comment' ? '🧹 초기화' : '🗑 취소'}</button>
          </div>
          <div className={styles["submit-comment"]}>
            <button className={styles["submit-button"]} onClick={type==="comment" ? handleComment : type==="update" ? handleUpdate : () => {}}>✍ 등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
