'use client';
import { useState, useEffect } from 'react'
import styles from './AllCommentsView.module.css';

import { Comment } from '@/services/comments'

import CommentView from './CommentView/CommentView'
import CoCommentView from './CoCommentView/CoCommentView'

type Props = {
  comments: Comment[] | null
  postId: string
  replyCount: number| null
  UpdateCommentApi: (postId: string, comment: string, commentId: string) => void
  DeleteCommentApi: (postId: string, commentId: string) => void
}

export default function AllCommentsView({comments, postId, replyCount, UpdateCommentApi, DeleteCommentApi}: Props) {

  return (
    <div className={styles["all-comments-container"]}>
      <p className={styles["comment-title"]}>댓글</p>
      {comments && comments.map((comment, index) => <CommentView key={index} comment={comment} postId={postId} UpdateCommentApi={UpdateCommentApi} DeleteCommentApi={DeleteCommentApi} />)}
      {/* <CoCommentView /> */}
    </div>
  );
}