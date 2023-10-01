'use client'
import styles from "./detailpage.module.css";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NEWStocksSample from '../../../../public/sample_image.png'

import { getPostDetail, likePost, deleteLikePost, scrapPost, deleteScrapPost} from '@/services/posts'
import { Comment, createComment, getComments, updateComment, deleteComment } from '@/services/comments'

import Button from "@/components/Button/Button";
import AllCommentsView from "@/components/AllCommentsView/AllCommentsView";
import StockInfo from "@/components/StockInfo/StockInfo";
import ImageDetailCarousel from "@/components/ImageDetailCarousel/ImageDetailCarousel"
import CommentInput from "@/components/CommentInput/CommentInput";
import LikeButton from "@/components/LikeButton/LikeButton";
import ScrapButton from "@/components/ScrapButton/ScrapButton"
import MultiCarousel from "@/components/MultiCarousel/MultiCarousel";

import { IoIosArrowBack } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import { Divider } from "@chakra-ui/react";

type Member = {
  profileImage: string
  name: string
}

type Post = {
  id: string
  title: string
  content: string
  hasAuthority: boolean
  isScrapped: boolean
  isLiked: boolean
  scrapCount: number
}
type Stock = {
  id: string
  name: string
}

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function DetailnotePage({ params: {id} }: Props) {
  const [member, setMember] = useState<Member | null>(null) 
  const [comments, setComments] = useState<Comment[] | null>([])
  const [stock, setStock] = useState<Stock | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [imageList, setImageList] = useState(null)
  const [imageListLength, setimageListLength] = useState(null)

  useEffect(() => {
    getPostDetail(id)
    .then(res => res.data)
    .then(res => {
      console.log(res)
      setMember(res.memberDto)
      setComments(res.replyResDtoList)
      setStock(res.stockDto)
      setPost(res)
      setImageList(res.reviewNoteImageDtoList)
      setimageListLength(res.reviewNoteImageDtoList.length)
    })
  // eslint-disable-next-line 
  }, [])

  // 댓글 생성 관리
  const CreateCommentApi = (id: string, comment: string) => {
    createComment(id, comment).then(() => getComments(id).then((res) => setComments(res.data)))
  }

   // 댓글 수정 관리
   const UpdateCommentApi = (postId: string, comment: string, commentId: string) => {
    updateComment(postId, comment, commentId).then(() => getComments(postId).then((res) => setComments(res.data)))
  }

  // 댓글 삭제 관리
  const DeleteCommentApi = (postId: string, commentId: string) => {
    console.log(postId, commentId, 'delete 해보자')
    deleteComment(postId, commentId)
    .then((res) => console.log(res))
    .then(() => console.log('sucess!!'))
    .then(() => getComments(postId).then((res) => {setComments(res.data); console.log(res.data)}))
  }

  return (
    <div className={styles.main}>
      <div className={styles["detail-back"]}>
        <button>
          <IoIosArrowBack size="23" />
          <div>뒤로가기</div>
        </button>
      </div>

      <div className={styles["content-container"]}>
        <div className={styles["detail-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["profile"]}>
              <Image
                src={member ? member.profileImage : ''}
                alt="image preview"
                width="35"
                height="10"
                className={styles["profile-img"]}
              />
              <div className={styles["profile-name"]}>{member && member.name}</div>
            </div>
            <div className={styles["time"]}>23.08.30 11:41</div>
          </div>

          <div className={styles["header-right"]}>
            {post && <ScrapButton status={post.isScrapped} id={post.id} count={post.scrapCount} detail={true}/>}
          </div>
        </div>

        <div className={styles["detail-subheader"]}>
          <div className={styles["title"]}>{post && post.title}</div>

          {post && post.hasAuthority && 
          (<div className={styles["sub-Buttons"]}>
            <div><Link href={{pathname: `/community/update`, query: id}}><Button text="수정하기" highlight={true} kindof={null}/></Link></div>
            <div><Button text="삭제하기" highlight={true} kindof={null}/></div>
          </div>)
          }
        </div>

        <div className={styles["stock-box"]}>
          {stock && <StockInfo stock={stock}/>}
        </div>

        {/* <div className={styles["tag-box"]}>
          <div>#우량주</div>
          <div>#급매</div>
        </div> */}

        <div className={styles["content-box"]}>
            <div className={styles["img"]}>
              {imageListLength && imageList ? (<ImageDetailCarousel images={imageList} />)
              :
              (<Image
                src={NEWStocksSample}
                alt="note image"
                className={styles["image-container"]}
                placeholder="blur"
              />)
              }
            </div>
                  
            {post && <div className={styles["content"]} dangerouslySetInnerHTML={{ __html: post.content }}></div>}
        </div>
      </div>

      <div className={styles["icons-container"]}>
        <div>
          <LikeButton />
          <AiOutlineStar className={styles["icons"]} size="23" />
          <p>15</p>
        </div>
        <div>
          <AiOutlineShareAlt className={styles["icons"]} size="23" />
        </div>
      </div>

      <div className={styles["commentinput-container"]}>
        <CommentInput id={id} type="comment" CreateCommentApi={CreateCommentApi}/>
      </div>

      <div className={styles["commentview-container"]}>
        {comments && comments.length > 0 ? <AllCommentsView comments={comments} postId={id} UpdateCommentApi={UpdateCommentApi} DeleteCommentApi={DeleteCommentApi}/>
        : <div className={styles["no-comments"]}>
            <div className={styles["no-comments-first"]}>🤔 댓글이 없습니다!</div>
            <div className={styles["no-comments-second"]}>첫번째 댓글을 작성해보세요!</div>
          </div>}
      </div>
    </div>
  );
}
