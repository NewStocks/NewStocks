'use client';
import styles from './Card.module.css'
import styled from 'styled-components'
import Link from 'next/link';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

import { BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi"
import { AiOutlineStar } from "react-icons/ai"
import { AiOutlineShareAlt } from "react-icons/ai"

export default function Card() {
  return(
    <div className={styles["card-container"]}>
      <StyledLink href="/community/42">
        <div className={styles["image-container"]}></div>
      </StyledLink>

      <div className={styles["title-container"]}>
        <div className={styles["title-left"]}>
          <StyledLink href="/">
            <div className={styles["stock-box"]}>
              <div className={styles["stock-img"]}></div>
              <div className={styles["stock-name"]}>카카오</div>
            </div>
          </StyledLink>
          <StyledLink href="/community/42">
            <div className={styles["title"]}>
              여기가 제목 영역입니다.
            </div>
          </StyledLink>
        </div>

        <div className={styles["title-right"]}>
          <BsBookmark size="19"/>
        </div>
      </div>
      
      <StyledLink href="/community/1">
        <div className={styles["content-container"]}>
          <div className={styles["content"]}>카카오 국민주라더니 명성을 뒤로하고 맥없이 흔들리네. 주가 놀라워서 말이 나오지 않는 상황. </div>
        </div>
      </StyledLink>

      <div className={styles["content-bottom-container"]}>
        <StyledLink href="/community/user">    
          <div className={styles["profile-container"]}>
            <div className={styles["stock-img"]}></div>
            <div className={styles["profile-name"]}>Anima Ag.</div>
          </div>
        </StyledLink>

        <StyledLink href="/community/1">
          <div className={styles["time"]}>23.08.30 11:41</div>
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