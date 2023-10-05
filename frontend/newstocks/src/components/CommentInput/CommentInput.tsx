"use client";
import styles from "./CommentInput.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  id: string
  commentId?: string
  postId?: string
  type: "comment" | "cocomment" | "update" | "coUpdate"
  content?: string
  img?: string
  CreateCommentApi?: (id: string, comment: string) => void;
  handleToggle?: () => void;
  handleUpdateToggle?: () => void;
  UpdateCommentApi?: (postId: string, comment: string, commentId: string) => void;
  handleCreateReplyApi?: (id: string, content: string) => void
  handleUpdateReplyToggle?: () => void;
  UpdateReplyApi?: (commentId: string, content: string, replyId: string) => void;
};

export default function CommentInput({ id, commentId, postId, type, content, img, CreateCommentApi, handleToggle, UpdateCommentApi, handleUpdateToggle, handleCreateReplyApi, handleUpdateReplyToggle, UpdateReplyApi }: Props) {
  const [commentInput, setCommentInput] = useState("")

  useEffect(() => {
    if (type==="update" || type==="coUpdate") {
      const textarea = document.getElementById(`my-textarea-${id}`) as HTMLInputElement | null;
      if (textarea) {
        textarea.value = `${content}`
      }
    }
  // eslint-disable-next-line 
  }, [])

  // 댓글 생성 관리
  const handleComment = () => {
    if(CreateCommentApi) {
      const comment = commentInput.trim();
      CreateCommentApi(id, comment);
      setCommentInput("");

      handleReset()
  }}

  // 댓글 수정 관리
  const handleUpdate = () => {
    const comment = commentInput.trim();
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

  // 대댓글 등록 관리
  const handleCreateReply = () => {
    const comment = commentInput.trim()
    if (!comment) {
      alert('변경 내용이 없습니다!')
    } else {
      if (id && handleToggle && handleCreateReplyApi) {
        handleCreateReplyApi(id, comment);
        handleToggle();
        setCommentInput("");
        handleReset()
      }
    }
  }

  // 대댓글 수정 관리
  const handleUpdateReply = () => {
    const comment = commentInput.trim()
    if (!comment) {
    alert('변경 내용이 없습니다!')
    } else {
      if (id && commentId && handleUpdateReplyToggle && UpdateReplyApi) {
        UpdateReplyApi(commentId, comment, id)
        handleUpdateReplyToggle()
        setCommentInput("")
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
      {img && <Image
        src={img}
        alt="image preview"
        width="25"
        height="25"
        className={styles["writer"]}
      />}
      <div className={styles["input-box"]}>
        <textarea
          placeholder="오답노트에 대한 댓글을 남겨주세요! (300자 이내)&#13;&#10;띄어쓰기는 'shift + Enter'로 입력 가능"
          onChange={(e) => setCommentInput(e.target.value)}
          id={`my-textarea-${id}`}
          maxLength={500}
        />
        <div className={styles["button-box"]}>
          <div className={styles["submit-comment"]}>
            <button onClick={type==="comment" ? handleReset : type==="cocomment" ? handleToggle : type==="update" ? handleUpdateToggle : handleUpdateReplyToggle } className={styles["submit-button"]}>
              {type=='comment' ? '🧹 초기화' : '🗑 취소'}
            </button>
          </div>
          <div className={styles["submit-comment"]}>
            <button className={styles["submit-button"]} onClick={type==="comment" ? handleComment : type==="update" ? handleUpdate : type==="cocomment" ? handleCreateReply : handleUpdateReply}>
              ✍ 등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
