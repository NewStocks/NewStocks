'use client';
import styles from './Card.module.css'
import styled from 'styled-components'
import Link from 'next/link';
import Image from 'next/image';

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

export default function Card({post}: Props) {
  console.log(post)

  return(
    <div className={styles["card-container"]}>
      <StyledLink href="/community/42">
        <div className={styles["image-container"]}></div>
      </StyledLink>

      <div className={styles["title-container"]}>
        <div className={styles["title-left"]}>
          <StyledLink href="/">
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
          <BsBookmark size="19"/>
        </div>
      </div>
      <StyledLink href="/community/42">
        <div className={styles["title"]}>
          {post.title}
        </div>
      </StyledLink>
      
      <StyledLink href="/community/1">
        <div className={styles["content-container"]}>
          <div className={styles["content"]}>{post.content}</div>
        </div>
      </StyledLink>

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

        <StyledLink href="/community/1">
          <div className={styles["time"]}>{post.settingDate}</div>
        </StyledLink>
      </div>

      <div className={styles["bottom-container"]}>
        <div className={styles["tag-container"]}>
          <div>#우량주</div>
          <div>#급매</div>
        </div>
        <div className={styles["icons-container"]}>
        <StyledLink href="/community/1">
          <div><BiCommentDetail className={styles["icons"]} size="21"/><p>15</p></div>
        </StyledLink>
          <div><AiOutlineStar className={styles["icons"]} size="21"/><p>15</p></div>
          <div><AiOutlineShareAlt className={styles["icons"]} size="21"/></div>
        </div>
      </div>
    </div>
  ) 
}