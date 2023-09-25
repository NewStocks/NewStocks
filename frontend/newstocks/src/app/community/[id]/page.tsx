'use client'
import styles from "./detailpage.module.css";
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getPostDetail } from '@/services/posts'
import { createComment } from '@/services/comments'
import { Comment } from '@/services/comments'

import Button from "@/components/Button/Button";
import AllCommentsView from "@/components/AllCommentsView/AllCommentsView";
import StockInfo from "@/components/StockInfo/StockInfo";
import CommentInput from "@/components/CommentInput/CommentInput";

import { IoIosArrowBack } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineShareAlt } from "react-icons/ai";

type Member = {
  profileImage: string
  name: string
}

type Post = {
  title: string
  content: string
  hasAuthority: boolean
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
  // const [imageList, setImageList] = useState([])

  useEffect(() => {
    getPostDetail(id)
    .then(res => {
      console.log(res.data);
      setMember(res.data.memberDto)
      console.log(res.data.memberDto.profileImage)
      setComments(res.data.replyResDtoList)
      console.log(res.data.replyResDtoList)
      setStock(res.data.stockDto)
      setPost(res.data)
    })
  }, [])

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
                width="25"
                height="25"
                className={styles["profile-img"]}
              />
              <div className={styles["profile-name"]}>{member && member.name}</div>
            </div>
            <div className={styles["time"]}>23.08.30 11:41</div>
          </div>

          <div className={styles["header-right"]}>
            <div>스크랩하기</div>
            <BsBookmark size="20" />
          </div>
        </div>

        <div className={styles["detail-subheader"]}>
          <div className={styles["title"]}>{post && post.title}</div>

          {post && post.hasAuthority && 
          (<div className={styles["sub-Buttons"]}>
            <div><Button text="수정하기" highlight={true} kindof={null}/></div>
            <div><Button text="삭제하기" highlight={true} kindof={null}/></div>
          </div>)
          }
        </div>

        <div className={styles["stock-box"]}>
          {stock && <StockInfo stock={stock}/>}
        </div>

        <div className={styles["tag-box"]}>
          <div>#우량주</div>
          <div>#급매</div>
        </div>

        <div className={styles["content-box"]}>
          <div className={styles["img"]}></div>
          <div className={styles["content"]}>
            {post && post.content}
          </div>
        </div>
      </div>

      <div className={styles["icons-container"]}>
        <div>
          <BiCommentDetail className={styles["icons"]} size="23" />
          <p>15</p>
        </div>
        <div>
          <AiOutlineStar className={styles["icons"]} size="23" />
          <p>15</p>
        </div>
        <div>
          <AiOutlineShareAlt className={styles["icons"]} size="23" />
        </div>
      </div>

      <div className={styles["commentinput-container"]}>
        <CommentInput id={id} type="comment" func={createComment}/>
      </div>

      <div className={styles["commentview-container"]}>
        {comments && <AllCommentsView comments={comments}/>}
      </div>
    </div>
  );
}
