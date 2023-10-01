'use client';
import styles from './CoCommentView.module.css';
import Image from 'next/image';
import { useState } from 'react';

import { FaRegThumbsUp } from 'react-icons/fa'
import { BiCommentDots } from 'react-icons/bi'
import { PiArrowElbowDownRightBold } from 'react-icons/pi'

import { Comment } from "@/services/comments"

type Props = {
  reply: Comment
  name: string
}


export default function CoCommentView({ reply, name }: Props) {
  return (
    <div className={styles["comment-container"]}>
      <div className={styles["left"]}>
        {/* <PiArrowElbowDownRightBold size="22"/> */}
      </div>
      <hr />

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

        <div className={styles["content"]}>
          <div className={styles["replying-to"]}>Replying to <span>{name}</span></div>
          <pre>{reply.content}</pre>
        </div>

        <div className={styles["reply-bottom-buttons"]}>
          <div className={styles["icons"]}>
            {/* {likeStatus ?
            (<div onClick={() => handleDeleteLike()}><BsHandThumbsUpFill size="20"/><p>{currLikeCount} Likes</p></div>)
            :(<div onClick={() => handleLike()}><BsHandThumbsUp size="20"/><p>{currLikeCount} Likes</p></div>)
            } */}
            <div><FaRegThumbsUp size="20"/><p>{reply.likeCount} Likes</p></div>
          </div>
          {(reply.memberDto.role==="ADMIN" || reply.hasAuthority) &&
          (<div className={styles["icons"]}>
            <div id={styles["reply-update"]} onClick={() => {}}>✏️수정하기</div>
            <div onClick={() => {}}>🗑️삭제하기</div>
          </div>)}
        </div>
      </div>

    </div>
  )
}