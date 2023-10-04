'use client';
import styles from './CommentView.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react'

import { BsHandThumbsUp, BsHandThumbsUpFill, BsSendPlus } from "react-icons/bs"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { BiCommentDots } from "react-icons/bi"
import { MdOutlineArrowDropDownCircle, MdOutlineArrowCircleUp } from "react-icons/md"

import { likeComment, deleteLikeComment, Comment, getComments, Reply } from '@/services/comments'
import { getAllReplies, createReply, deleteReply, updateReply } from "@/services/replies"

import CommentInput from '@/components/CommentInput/CommentInput'
import CoCommentView from '@/components/AllCommentsView/CoCommentView/CoCommentView'
import { StyledLink } from '@/components/StyledLink/StyledLink'

type Props = {
  comment: Comment
  postId: string
  UpdateCommentApi: (postId: string, comment: string, commentId: string) => void
  DeleteCommentApi: (postId: string, commentId: string) => void
}

export default function CommentView({comment: { id, content, replyCommentResDtoList ,hasAuthority, isLiked, likeCount, memberDto, createdDate, modifiedDate }, postId, UpdateCommentApi, DeleteCommentApi} : Props) {
  const [likeStatus, setLikeStatus] = useState(isLiked)
  const [currLikeCount, setCurrLikeCount] = useState(likeCount)
  const [cocommentToggle, setcocommentToggle] = useState(false);
  const [replyListToggle, setReplyListToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [ReplyListLength, setReplyListLength] = useState<number | null>(replyCommentResDtoList.length);
  const [ReplyList, setReplyList] = useState<Reply[] | null>(null)

  useEffect(() => {
    setReplyList(replyCommentResDtoList)
  }, [replyCommentResDtoList.length])

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
    .then(res => {})
    .then(() => {setCurrLikeCount(currLikeCount + 1); setLikeStatus(prev=>!prev)})
  }

  // 댓글 좋아요 취소
  const handleDeleteLike = () => {
    deleteLikeComment(id)
    .then(() => {setCurrLikeCount(currLikeCount -1); setLikeStatus(prev=>!prev)})
  }
  
  // 대댓글 생성 관리
  const handleCreateReplyApi = (id: string, content: string) => {
    createReply(id, content)
    .then(() => getAllReplies(id).then(res => {setReplyList(res.data); setReplyListLength(res.data.length)}))
  }

  // 대댓글 삭제 관리
  const HandleDeleteReplyApi = (commentId: string, replyId: string) => {
    deleteReply(commentId, replyId)
    .then(() => getAllReplies(id).then(res => {setReplyList(res.data); setReplyListLength(res.data.length)}))
  }

  // 대댓글 수정 관리
  const UpdateReplyApi = (commentId: string, content: string, replyId: string) => {
    updateReply(commentId, content, replyId)
    .then(() => getAllReplies(id).then(res => setReplyList(res.data)))
  }

  // 해당 댓글의 대댓글 불러오기
  // const HandleReplyList = () => {
  //   getAllReplies(id)
  //   .then(res => setReplyList(res.data))
  // }
  
  return (
    <>
    <div className={styles["comment-container"]}>

      <div className={styles["profile"]}>
        <StyledLink href={`/community/user/${memberDto.id}`}>
          <div style={{ display: "flex" }}>
            <Image
              src={memberDto.profileImage}
              alt="image preview"
              width="25"
              height="25"
              className={styles["profile-img"]}
            />
            <div className={styles["profile-name"]}>{memberDto.name}</div>
          </div>
        </StyledLink>
        <div className={styles["time"]}>{createdDate?.slice(0, 16)}</div>
      </div>
    {!updateToggle ?
    (<>
      <pre className={styles["content"]}>
        {content}
      </pre>

      <div className={styles["icons"]}>
        <div className={styles["icons-div"]}>
          {likeStatus ?
          (<div className={styles["icons-div-div"]} onClick={() => handleDeleteLike()}>
            <BsHandThumbsUpFill className={styles["like-icon"]} size="20"/><p>{currLikeCount} Likes</p></div>)
          :(<div className={styles["icons-div-div"]} onClick={() => handleLike()}><BsHandThumbsUp size="20"/><p>{currLikeCount} Likes</p></div>)
          }
          <div className={styles["icons-div-div"]} onClick={() => setcocommentToggle(prev=>!prev)}>
            <BsSendPlus size={17} className={styles["reply-add-icon"]}/>답글작성
          </div>
        </div>
        {hasAuthority && (
        <div className={styles["icons-div"]}>
          <div className={styles["icons-div-div"]} onClick={() => setUpdateToggle((prev) => !prev)}>✏️수정하기</div>
          <div className={styles["icons-div-div"]} onClick={() => DeleteCommentApi(postId, id)}>🗑️삭제하기</div>
        </div> 
        )}
      </div>
    </>
    )
    : (<CommentInput id={id} postId={postId} type="update" UpdateCommentApi={UpdateCommentApi} handleUpdateToggle={handleUpdateToggle} content={content}/>)
    }
    {cocommentToggle ? 
    (<CommentInput id={id} type='cocomment' handleToggle={handleToggle} content={content} handleCreateReplyApi={handleCreateReplyApi}/>)
    :''}
    <div className={styles["icons-reply"]} onClick={() => {
        setReplyListToggle(prev=>!prev);
      }}><p>답글 {ReplyListLength}개</p>
      {!replyListToggle ? 
      (<MdOutlineArrowDropDownCircle className={styles["reply-toggle-icon"]}size="20"/>)
      :(<MdOutlineArrowDropDownCircle className={`${styles["reply-toggle-icon"]} ${styles["rotate-icon"]}` }size="20"/>)}
      </div>
    </div>
    {!replyListToggle && <div className={styles["cocomment-box"]}>
      {/* <hr/> */}
      <div className={styles["cocomment-input"]}>
      </div>
      {ReplyList && ReplyList.map((reply) => {return (<CoCommentView key={reply.id} reply={reply} name={memberDto.name} HandleDeleteReplyApi={HandleDeleteReplyApi} commentId={id} UpdateReplyApi={UpdateReplyApi}/>)})}
    </div>}
    </>
  );
}
