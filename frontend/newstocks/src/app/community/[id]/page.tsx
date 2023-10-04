'use client'
import styles from "./detailpage.module.css";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NEWStocksSample from '../../../../public/sample_image.png'

import { getPostDetail, deletePost} from '@/services/posts'
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
import { HiMiniArrowTrendingUp } from "react-icons/hi2"

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
  likeCount: number
  buyPrice : number
  buyQuantity : number
  sellPrice : number
  sellQuantity : number
  // buyDate, sellDate 필요
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
  const router = useRouter()
  const [member, setMember] = useState<Member | null>(null) 
  const [comments, setComments] = useState<Comment[] | null>([])
  const [stock, setStock] = useState<Stock | null>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [imageList, setImageList] = useState(null)
  const [imageListLength, setimageListLength] = useState(null)
  const [buyDate, setBuyDate] = useState(null)
  const [sellDate, setSellDate] = useState(null)
  const [buyPrice, setBuyPrice] = useState(null)
  const [sellPrice, setSellPrice] = useState(null)
  const [buyQuantity, setBuyQuantity] = useState(null)
  const [sellQuantity, setSellQuantity] = useState(null)
  const [createdDate, setCreatedDate] = useState("")
  const [settingDate, setSettingDate] = useState("")
  const [replyCount, setReplyCount] = useState(0)

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
      setBuyDate(res.butDate?.slice(0, 10))
      setSellDate(res.sellDate?.slice(0, 10))
      setBuyPrice(res.buyPrice)
      setSellPrice(res.sellPrice)
      setBuyQuantity(res.buyQuantity)
      setSellQuantity(res.sellQuantity)
      setCreatedDate(res.createdDate)
      setReplyCount(res.replyCount)
    })
  // eslint-disable-next-line 
  }, [])

  // 댓글 전체 새로고침
  const RefreshCommentsApi = (postId: string) => {
    getComments(postId).then((res) => setComments(res.data))
  }

  // 댓글 생성 관리
  const CreateCommentApi = (id: string, comment: string) => {
    createComment(id, comment).then(() => RefreshCommentsApi(id))
  }

   // 댓글 수정 관리
   const UpdateCommentApi = (postId: string, comment: string, commentId: string) => {
    updateComment(postId, comment, commentId).then(() => RefreshCommentsApi(id))
  }

  // 댓글 삭제 관리
  const DeleteCommentApi = (postId: string, commentId: string) => {
    // console.log(postId, commentId, 'delete 해보자')
    deleteComment(postId, commentId)
    .then(() => RefreshCommentsApi(id))
  }

  // 노트 삭제
  const DeleteNoteApi = (postId: string) => {
    deletePost(postId)
    .then(() => router.push("/community/mine?page=my"))
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
            <div className={styles["time"]}>{createdDate?.slice(0, 16)}</div>
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
            <div onClick={() => DeleteNoteApi(post.id)}><Button text="삭제하기" highlight={true} kindof={null}/></div>
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
        <div className={styles["deal-info-container"]}>
          <div>
            <div className={styles["deal-container"]}>
              <div className={styles["deal-box"]}>
                <div className={styles["deal-dot"]}></div>
                <div className={styles["deal-title"]}>매수</div>
                {buyDate && (<div className={styles["deal-date"]}>{buyDate}</div>)}
              </div>
              {(buyPrice || buyQuantity) ?
              (<div className={styles["deal-sub-box"]}>
                <div className={styles["deal-subtitle"]}>매수 가격</div>{buyPrice && (<div className={styles["deal-figure"]}>{buyPrice}원</div>)}
                <div className={styles["deal-subtitle"]}>매수량</div>{buyQuantity && (<div className={styles["deal-figure"]}>{buyQuantity}</div>)}
                {(buyPrice && buyQuantity) ? (<><div className={styles["deal-subtitle"]}>매수 금액</div><div className={styles["deal-figure"]}>{buyPrice * buyQuantity}원 </div></>) 
                : ''}
              </div>)
              : (<div className={styles["deal-sub-box"]}>매수 정보가 없습니다</div>)
              }
            </div>

            <div className={styles["deal-container"]}>
              <div>
                <div className={styles["deal-box"]}>
                  <div className={styles["deal-dot"]}></div>
                  <div className={styles["deal-title"]}>매도</div>
                  {sellDate && (<div className={styles["deal-date"]}>{sellDate}</div>)}
                </div>
                {(sellPrice || sellQuantity) ?
                (<div className={styles["deal-sub-box"]}>
                  <div className={styles["deal-subtitle"]}>매도 가격</div>{sellPrice && (<div className={styles["deal-figure"]}>{sellPrice}원</div>)}
                  <div className={styles["deal-subtitle"]}>매도량</div>{sellQuantity && (<div className={styles["deal-figure"]}>{sellQuantity}</div>)}
                  {(sellPrice && sellQuantity) ? (<><div className={styles["deal-subtitle"]}>매도 금액</div><div className={styles["deal-figure"]}>{sellPrice * sellQuantity}원</div></>) 
                  : '매도 정보가 없습니다.'}
                </div>)
                :(<div className={styles["deal-sub-box"]}>매도 정보가 없습니다.</div>)
              }
              </div>
            </div>
            </div>

            {(buyPrice && buyQuantity && sellPrice && sellQuantity) ? (
              <div className={styles["deal-profit-box"]}>
                <div className={styles["deal-subtitle"]} id={styles["profit-title"]}>수익</div>
                <div className={styles["deal-figure"]} id={styles["profit"]}>{sellPrice * sellQuantity - buyPrice * buyQuantity}원 <HiMiniArrowTrendingUp id={styles["profit-icon"]}/></div>
              </div>
            ): ''}
        </div>

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
        {post && <LikeButton status={post.isLiked} id={id} count={post.likeCount} detail={true}/>}

        <div>
          {/* <AiOutlineShareAlt className={styles["icons"]} size="23" /> */}
        </div>
      </div>

      <div className={styles["commentinput-container"]}>
        <CommentInput id={id} type="comment" CreateCommentApi={CreateCommentApi}/>
      </div>

      <div className={styles["commentview-container"]}>
        {comments && comments.length > 0 ? <AllCommentsView comments={comments} postId={id} replyCount={replyCount} UpdateCommentApi={UpdateCommentApi} DeleteCommentApi={DeleteCommentApi}/>
        : <div className={styles["no-comments"]}>
            <div className={styles["no-comments-first"]}>🤔 댓글이 없습니다!</div>
            <div className={styles["no-comments-second"]}>첫번째 댓글을 작성해보세요!</div>
          </div>}
      </div>
    </div>
  );
}
