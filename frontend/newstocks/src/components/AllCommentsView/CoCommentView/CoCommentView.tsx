'use client';
import styles from './CoCommentView.module.css';
import Image from 'next/image';
import { useState } from 'react';

import { Comment } from "@/services/comments"
import { likeReply, deleteLikeReply } from "@/services/replies"

import CommentInput from "@/components/CommentInput/CommentInput"

import { BsHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs'

type Props = {
  reply: Comment
  name: string
  commentId: string
  HandleDeleteReplyApi: (commentId: string, replyId: string) => void
  UpdateReplyApi: (commentId: string, content: string, replyId: string) => void
}

export default function CoCommentView({ reply, name, commentId, HandleDeleteReplyApi, UpdateReplyApi }: Props) {
  const [likeCount, setLikeCount] = useState(reply.likeCount)
  const [likeStatus, setLikeStatus] = useState(reply.isLiked)
  const [replyUpdateToggle, setReplyUpdateToggle] = useState(false)

  // 대댓글 좋아요 추가
  const handleLike = () => {
    likeReply(reply.id)
    .then(res => console.log(res))
    .then(() => {setLikeCount(likeCount + 1); setLikeStatus(prev=>!prev)})
  }

  // 대댓글 좋아요 취소
  const handleDeleteLike = () => {
    deleteLikeReply(reply.id)
    .then(res => console.log(res))
    .then(() => {setLikeCount(likeCount -1); setLikeStatus(prev=>!prev)})
  }
  
  const handleUpdateReplyToggle = () => {
    setReplyUpdateToggle(prev=>!prev)
  }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["right"]}>
        <div className={styles["profile"]}>
          <Image
            src={reply.memberDto.profileImage}
            alt="image preview"
            width="25"
            height="25"
            className={styles["profile-img"]}
          />
          <div className={styles["profile-name"]}>{reply.memberDto.name}</div>
          <div className={styles["time"]}>23.08.30 11:41</div>
        </div>

      {!replyUpdateToggle ?
      (<>
        <div className={styles["content"]}>
          <div className={styles["replying-to"]}>Replying to <span>{name}</span></div>
          <pre>{reply.content}</pre>
        </div>

        <div className={styles["reply-bottom-buttons"]}>
          <div className={styles["icons"]}>
            {likeStatus ?
            (<div onClick={() => handleDeleteLike()}><BsHandThumbsUpFill size="20"/><p>{likeCount} Likes</p></div>)
            :(<div onClick={() => handleLike()}><BsHandThumbsUp size="20"/><p>{likeCount} Likes</p></div>)
            }
          </div>
          {(reply.memberDto.role==="ADMIN" || reply.hasAuthority) &&
          (<div className={styles["icons"]}>
            <div id={styles["reply-update"]} onClick={() => setReplyUpdateToggle(prev=>!prev)}>✏️수정하기</div>
            <div onClick={() => HandleDeleteReplyApi(commentId, reply.id)}>🗑️삭제하기</div>
          </div>)}
        </div>
      </>
      )
      : (<CommentInput id={reply.id} content={reply.content} commentId={commentId} type="coUpdate" handleUpdateReplyToggle={handleUpdateReplyToggle} UpdateReplyApi={UpdateReplyApi}/>)
      }
    </div>

    </div>
  )
}