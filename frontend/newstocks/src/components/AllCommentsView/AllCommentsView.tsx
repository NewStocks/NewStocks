'use client';
import styles from './AllCommentsView.module.css';

import CommentView from './CommentView/CommentView'
import CoCommentView from './CoCommentView/CoCommentView'

export default function AllCommentsView() {
  return (
    <div className={styles["all-comments-container"]}>
      <h2>댓글 12</h2>
      <CommentView />
      <CoCommentView />
    </div>
  );
}