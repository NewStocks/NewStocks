'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './communitypage.module.css';

import LandingView from '@/components/LandingView/LandingView'
import LandingFooter from '@/components/LandingView/LandingFooter/LandingFooter'
import Button from '@/components/Button/Button'
import MultiCarousel from '@/components/MultiCarousel/MultiCarousel'
import CarouselCard from '@/components/MultiCarousel/CarouselCard/CarouselCard'
import CarouselCardBox from '@/components/CarouselCardBox/CarouselCardBox'
import { StyledLink } from '@/components/StyledLink/StyledLink'

import communityLanding from '../../../public/community-landing.png';
import { PiArrowSquareRightBold } from "react-icons/pi"
import { IoIosArrowForward } from "react-icons/io"

import { getHotPostsList } from '@/services/postsReturn'

import { addAccessTokenToHeaders, getAccessToken } from '@/utils/token';
import LoginModal from '@/components/LoginModal/LoginModal';
import { Provider } from '@/utils/ChakraProvider';
import Link from 'next/link';

export default function CommunityPage() {
  const [posts, setPosts] = useState([])
  const [accessToken, setAccessToken] = useState(false)
  
  useEffect(() => {
    getHotPostsList()
    .then(res => setPosts(res.data.slice(0, 10)))

    const token = addAccessTokenToHeaders()
    // console.log(token['access-token'])
    if (token) {setAccessToken(true)}

  }, [])
  // const posts = await getHotPostsList()
  // console.log('posts', posts)

  return ( 
    <div className={styles.main}>
      <div>
        <div className={styles["landing-main-container"]}>
          <div className={styles["title-main-container"]}>
            <div className={styles["title-animation"]}>
              <div className={styles["title-mini"]}>100% 주식 오답노트 솔루션 📝</div>
              <div className={styles["title"]}><span>NEWStocks</span> 커뮤니티에서</div> 
              <div className={styles["title"]}><span>주식 오답노트</span>를 공유해보세요</div>
            </div>
            <div className={`${styles["sub-title-container"]} ${styles["title-animation"]}`}>
              <div>주식 오답노트 작성으로 나의 투자 기록을 회고하고</div>
              <div>다양한 투자기록을 참고해보세요!</div>
            </div>
            <div className={styles["title-botton-box"]}>
              <StyledLink href={'/community/mine?page=my'}>
                <div className={styles["Button-width"]}><Button text="나의노트" highlight={true} kindof="arrow"></Button></div>
              </StyledLink>
              <StyledLink href={'/community/create'}>
                <div className={styles["Button-width"]}><Button text="노트작성" highlight={false} kindof="arrow"></Button></div>
              </StyledLink>
            </div>
          </div>

          <Image
          src={communityLanding}
          alt="note image"
          className={`${styles["landing-main-image"]} ${styles["title-animation"]}`}
          height={390}
          />
        </div>
      </div>

      {/* <div className={styles["sorted-note-box"]}>
        <div className={styles["sorted-note-title"]}>
          ✍나의 노트 모아보기
            <Link href="/your-target-url">
              더보기
              <IoIosArrowForward className={styles["sorted-note-icon"]} />
            </Link>
        </div>
        <div className={styles["mynote-out-box"]}>
          여기에 나의 노트 목록 들어가야할듯?
          <div>NEWStocks에 가입해 나의 주식 오답노트를 관리해보세요!</div>
          <div className={styles["login-box"]}>로그인<PiArrowSquareRightBold size={17} className={styles["login-icon"]}/></div>
        </div>
      </div> */}

      <div className={styles["sorted-note-box"]}>
        {/*<div className={styles["sorted-note-title"]}>🔥현재 인기 노트<span>더보기<IoIosArrowForward className={styles["sorted-note-icon"]}/></span></div>*/}
        <div className={styles["sorted-note-title"]}>🔥현재 인기 노트</div>
        {accessToken ? (
        <div className={styles["carousel-container"]}>
          <CarouselCardBox posts={posts}/>
        </div>)
        :(
        <div className={styles["mynote-out-box"]}>
          <div>NEWStocks에 가입해 인기노트를 확인해보세요!</div>
          <div className={styles["login-box"]}>로그인<PiArrowSquareRightBold size={17} className={styles["login-icon"]}/></div>
        </div> 
        )}
      </div>

      {/* <LandingFooter /> */}

    </div>
  )
}