'use client';
import styles from './CommentView.module.css';
import Image from 'next/image';
import { Comment } from '@/services/comments'
import { useState } from 'react'

import { FaRegThumbsUp } from 'react-icons/fa'
import { BiCommentDots } from 'react-icons/bi'

import CommentInput from '@/components/CommentInput/CommentInput'

type Props = {
  comment: Comment
  postId: string
  UpdateCommentApi: (postId: string, comment: string, commentId: string) => void
  DeleteCommentApi: (postId: string, commentId: string) => void
}

export default function CommentView({comment: { id, content, hasAuthority, isLiked, likeCount, memberDto }, postId, UpdateCommentApi, DeleteCommentApi} : Props) {
  const [cocommentToggle, setcocommentToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  function handleToggle() {
    setcocommentToggle((prev) => !prev);
  }

  function handleUpdateToggle() {
    setUpdateToggle((prev) => !prev)
  }
 
  return (
    <>
    {!updateToggle ?
    (<div className={styles["comment-container"]}>

      <div className={styles["profile"]}>
        <Image
          src={memberDto.profileImage}
          alt="image preview"
          width="25"
          height="25"
          className={styles["profile-img"]}
        />
        <div className={styles["profile-name"]}>{memberDto.name}</div>
        <div className={styles["time"]}>23.08.30 11:41</div>
      </div>

      <pre className={styles["content"]}>
        {content}
      </pre>

      <div className={styles["icons"]}>
        <div>
          <div><FaRegThumbsUp size="20"/><p>{likeCount} Likes</p></div>
          <div onClick={() => setcocommentToggle(true)}><BiCommentDots size="23"/><p>대댓글</p></div>
        </div>
        {hasAuthority && (
        <div>
          <div onClick={() => setUpdateToggle((prev) => !prev)}>✏️수정하기</div>
          <div onClick={() => DeleteCommentApi(postId, id)}>🗑️삭제하기</div>
        </div>
        )}
      </div>

    </div>)
     : (<CommentInput id={id} postId={postId} type="update" UpdateCommentApi={UpdateCommentApi} handleUpdateToggle={handleUpdateToggle} content={content}/>)
    }
    {cocommentToggle && <div className={styles["cocomment-box"]}>
      <hr/>
      <div className={styles["cocomment-input"]}><CommentInput id={id} type='cocomment' handleToggle={handleToggle} content={content}/></div>
    </div>}
    </>
  );
}
