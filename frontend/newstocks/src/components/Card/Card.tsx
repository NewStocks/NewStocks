'use client';
import styles from './Card.module.css'
import styled from 'styled-components'
import Link from 'next/link';
import Image from 'next/image';
import NEWStocksSample from '../../../public/sample_image.png';

import ScrapButton from '@/components/ScrapButton/ScrapButton'
import LikeButton from '@/components/LikeButton/LikeButton'

import { useState } from 'react';

import { Post, Member  } from '@/services/posts'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

type Props = {
  post: Post
}

import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineStar } from "react-icons/ai"
import { AiOutlineShareAlt } from "react-icons/ai"
import { MdOutlineSell, MdSell } from "react-icons/md"

export default function Card({post}: Props) {

  return(
    <div className={styles["card-container"]}>
      <StyledLink href={`/community/${post.id}`}>
        {post.reviewNoteImageDtoList && post.reviewNoteImageDtoList.length > 0?
        (<Image
          src={post.reviewNoteImageDtoList[0].url}
          alt="note image"
          width="330"
          height="175"
          className={styles["image-container"]}
        />)
        :
        (<Image
          src={NEWStocksSample}
          alt="note image"
          width="330"
          height="175"
          className={styles["image-container"]}
          placeholder="blur"
        />)
        }

      </StyledLink>
      <div className={styles["title-container"]}>
        <div className={styles["title-left"]}>
          <StyledLink href={`/${post.stockDto.id}`}>
            <div className={styles["stock-box"]}>
              <Image
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${post.stockDto.id}.png` ? `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${post.stockDto.id}.png` : ''}
                  alt="member profile image"
                  width="25"
                  height="25"
                  className={styles["stock-img"]}
                />
              {/* <div className={styles["stock-img"]}></div> */}
              <div className={styles["stock-name"]}>{post.stockDto.name}</div>
              <div className={styles["stock-id"]}>{post.stockDto.id}</div>
            </div>
          </StyledLink>
        </div>
        <div className={styles["title-right"]}>
          <div className={styles["scrap-button"]}>
            <div className={styles["scrap-icon"]}><ScrapButton status={post.isScrapped} id={post.id} count={post.scrapCount}/></div>
          </div>
        </div>
      </div>

      <StyledLink href={`/community/${post.id}`}>
        <div className={styles["title"]}>
          {post.title}
        </div>
      
        <div className={styles["content-container"]}>
          <div className={styles["content"]} dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>

      <div className={styles["content-bottom-container"]}>
        <StyledLink href="/community/user">  
        <div className={styles["profile-container"]}>
          <Image
            src={post.memberDto.profileImage !=='x' ? post.memberDto.profileImage : ''}
            alt="member profile image"
            width="25"
            height="25"
            className={styles["profile-img"]}
          />
          <div className={styles["profile-name"]}>{post.memberDto.name}</div>
        </div>
        </StyledLink>

        <div className={styles["time"]}>{post.createdDate}</div>
      </div>
      </StyledLink>

      <div className={styles["bottom-container"]}>
        <div className={styles["tag-container"]}>
          <div ><MdSell className={styles["tag-icons"]}/>매수</div>
          <div><MdOutlineSell className={styles["tag-icons"]}/>매도</div>
        </div>
        <div className={styles["icons-container"]}>
          <div className={styles["like-button"]}>
          <LikeButton status={post.isLiked} id={post.id} count={post.likeCount}/>
          </div>
          <div><p>{post.replyCount}</p><BiCommentDetail className={styles["icons"]} size="21"/></div>
          {/* <div><AiOutlineShareAlt className={styles["icons"]} size="21"/></div> */}
        </div>
      </div>
    </div>
  ) 
}