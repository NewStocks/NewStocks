'use client';
import styles from './CoCommentView.module.css';
import Image from 'next/image';
import { useState } from 'react';

import { Comment, Reply } from "@/services/comments"
import { likeReply, deleteLikeReply } from "@/services/replies"

import CommentInput from "@/components/CommentInput/CommentInput"

import { BsHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs'
import { StyledLink } from '@/components/StyledLink/StyledLink'

type Props = {
  reply: Reply
  name: string
  commentId: string
  parentId: string
  HandleDeleteReplyApi: (commentId: string, replyId: string) => void
  UpdateReplyApi: (commentId: string, content: string, replyId: string) => void
}

export default function CoCommentView({ reply, name, commentId, HandleDeleteReplyApi, UpdateReplyApi, parentId }: Props) {
  const [likeCount, setLikeCount] = useState(reply.likeCount)
  const [likeStatus, setLikeStatus] = useState(reply.isLiked)
  const [replyUpdateToggle, setReplyUpdateToggle] = useState(false)
  console.log(reply)

  // 대댓글 좋아요 추가
  const handleLike = () => {
    likeReply(reply.id)
    .then(res => {})
    .then(() => {setLikeCount(likeCount + 1); setLikeStatus(prev=>!prev)})
  }

  // 대댓글 좋아요 취소
  const handleDeleteLike = () => {
    deleteLikeReply(reply.id)
    .then(res => {})
    .then(() => {setLikeCount(likeCount -1); setLikeStatus(prev=>!prev)})
  }
  
  const handleUpdateReplyToggle = () => {
    setReplyUpdateToggle(prev=>!prev)
  }

  return (
    <div className={styles["comment-container"]}>
      <div className={styles["right"]}>
        <div className={styles["profile"]}>
          <StyledLink href={`/community/user/${reply.memberDto.id}`}>
            <div style={{ display: "flex" }}>
              <Image
                src={reply.memberDto.profileImage}
                alt="image preview"
                width="25"
                height="25"
                className={styles["profile-img"]}
              />
              <div className={styles["profile-name"]}>{reply.memberDto.name}</div>
            </div>
          </StyledLink>
          <div className={styles["time"]}>{reply.createdDate?.slice(0, 16)}</div>
        </div>

      {!replyUpdateToggle ?
      (<>
        <div className={styles["content"]}>
          <div className={styles["replying-to"]}>Replying to 
            <StyledLink href={`/community/user/${parentId}`}>
              <span id={styles["nikname"]}>
                {name}
              </span>
            </StyledLink>
          </div>
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