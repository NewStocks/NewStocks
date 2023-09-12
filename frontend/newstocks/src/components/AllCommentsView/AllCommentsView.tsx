'use client';
import styles from './AllCommentsView.module.css';

import CommentView from './CommentView/CommentView'
import CoCommentView from './CoCommentView/CoCommentView'

export default function AllCommentsView() {
  return (
    <div className={styles["all-comments-container"]}>
      <CommentView />
      <CoCommentView />
    </div>
  );
}