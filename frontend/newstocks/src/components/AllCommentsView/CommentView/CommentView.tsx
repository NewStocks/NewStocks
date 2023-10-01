'use client';
import styles from './CommentView.module.css';
import Image from 'next/image';
import { Comment } from '@/services/comments'
import { useState } from 'react'

import { BsHandThumbsUp, BsHandThumbsUpFill, BsSendPlus } from "react-icons/bs"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { BiCommentDots } from "react-icons/bi"
import { MdOutlineArrowDropDownCircle } from "react-icons/md"

import { likeComment, deleteLikeComment } from '@/services/comments'
import { getAllReplies, createReply, deleteReply, updateReply } from "@/services/replies"

import CommentInput from '@/components/CommentInput/CommentInput'
import CoCommentView from '@/components/AllCommentsView/CoCommentView/CoCommentView'

type Props = {
  comment: Comment
  postId: string
  UpdateCommentApi: (postId: string, comment: string, commentId: string) => void
  DeleteCommentApi: (postId: string, commentId: string) => void
}

export default function CommentView({comment: { id, content, hasAuthority, isLiked, likeCount, memberDto }, postId, UpdateCommentApi, DeleteCommentApi} : Props) {
  const [likeStatus, setLikeStatus] = useState(isLiked)
  const [currLikeCount, setCurrLikeCount] = useState(likeCount)
  const [cocommentToggle, setcocommentToggle] = useState(false);
  const [replyListToggle, setReplyListToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);

  const [ReplyList, setReplyList] = useState(null);

  // 대댓글 입력 input 활성화 토글
  function handleToggle() {
    setcocommentToggle((prev) => !prev);
  }

  // 수정 input 활성화 토글
  function handleUpdateToggle() {
    setUpdateToggle((prev) => !prev)
  }

  // 댓글 좋아요 추가
  const handleLike = () => {
    likeComment(id)
    .then(res => console.log(res))
    .then(() => {setCurrLikeCount(currLikeCount + 1); setLikeStatus(prev=>!prev)})
  }

  // 댓글 좋아요 취소
  const handleDeleteLike = () => {
    deleteLikeComment(id)
    .then(res => console.log(res))
    .then(() => {setCurrLikeCount(currLikeCount -1); setLikeStatus(prev=>!prev)})
  }
  
  // 대댓글 생성 관리
  const handleCreateReplyApi = (id: string, content: string) => {
    createReply(id, content)
    .then((res) => {console.log(res); getAllReplies(id).then(res => {console.log(res); setReplyList(res.data)})})
  }

  // 대댓글 삭제 관리
  const HandleDeleteReplyApi = (commentId: string, replyId: string) => {
    deleteReply(commentId, replyId)
    .then((res) => {console.log(res); getAllReplies(id).then(res => {console.log(res); setReplyList(res.data)})})
  }

  // 대댓글 수정 관리
  const UpdateReplyApi = (commentId: string, content: string, replyId: string) => {
    updateReply(commentId, content, replyId)
    .then((res) => {console.log(res); getAllReplies(id).then(res => {console.log(res); setReplyList(res.data)})})
  }

  // 해당 댓글의 대댓글 불러오기
  const HandleReplyList = () => {
    getAllReplies(id)
    .then(res => setReplyList(res.data))
  }
  
  return (
    <>
    <div className={styles["comment-container"]}>

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
    {!updateToggle ?
    (<>
      <pre className={styles["content"]}>
        {content}
      </pre>

      <div className={styles["icons"]}>
        <div>
          {likeStatus ?
          (<div onClick={() => handleDeleteLike()}><BsHandThumbsUpFill size="20"/><p>{currLikeCount} Likes</p></div>)
          :(<div onClick={() => handleLike()}><BsHandThumbsUp size="20"/><p>{currLikeCount} Likes</p></div>)
          }
          <div onClick={() => {
            setReplyListToggle(prev=>!prev);
            HandleReplyList();
          }}><p>대댓글</p><MdOutlineArrowDropDownCircle className={styles["reply-toggle-icon"]}size="20"/></div>
        </div>
        {hasAuthority && (
        <div>
          <div onClick={() => setUpdateToggle((prev) => !prev)}>✏️수정하기</div>
          <div onClick={() => DeleteCommentApi(postId, id)}>🗑️삭제하기</div>
        </div>
        )}
      </div>
    </>
    )
    : (<CommentInput id={id} postId={postId} type="update" UpdateCommentApi={UpdateCommentApi} handleUpdateToggle={handleUpdateToggle} content={content}/>)
    }
    </div>
    {replyListToggle && <div className={styles["cocomment-box"]}>
      {/* <hr/> */}
      <div className={styles["cocomment-input"]}>
        {cocommentToggle ? 
        (<CommentInput id={id} type='cocomment' handleToggle={handleToggle} content={content} handleCreateReplyApi={handleCreateReplyApi}/>)
        :<div className={styles["reply-add-button"]}onClick={() => setcocommentToggle(prev=>!prev)}>
          <BsSendPlus size={17} className={styles["reply-add-icon"]}/>대댓글 작성하기
        </div>}
      </div>
      {ReplyList && ReplyList.map(reply => {console.log(reply); return (<CoCommentView reply={reply} name={memberDto.name} HandleDeleteReplyApi={HandleDeleteReplyApi} commentId={id} UpdateReplyApi={UpdateReplyApi}/>)})}
    </div>}
    </>
  );
}
