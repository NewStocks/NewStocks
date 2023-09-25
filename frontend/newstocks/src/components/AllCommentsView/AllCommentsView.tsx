'use client';
import styles from './AllCommentsView.module.css';

import { Comment } from '@/services/comments'

import CommentView from './CommentView/CommentView'
import CoCommentView from './CoCommentView/CoCommentView'

type Props = {
  comments: Comment[]
  postId: string
  UpdateCommentApi: (postId: string, comment: string, commentId: string) => void
}

export default function AllCommentsView({comments, postId, UpdateCommentApi}: Props) {
  const length = comments.length

  return (
    <div className={styles["all-comments-container"]}>
      <p className={styles["comment-title"]}>댓글 {length}</p>
      {comments.map(comment => <CommentView comment={comment} postId={postId} UpdateCommentApi={UpdateCommentApi}/>)}
      <CoCommentView />
    </div>
  );
}