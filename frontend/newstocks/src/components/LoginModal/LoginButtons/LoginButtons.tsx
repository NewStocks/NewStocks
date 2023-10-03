'use client';

import styles from './loginbuttons.module.css'

import Link from 'next/link'

import { FaComment }from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function LoginButtons() {
  const kakaoLoginHandler = () => {
    const REST_API_KEY = '63c9797738fedd0efff04b806ed9cba0'
    const REDIRECT_URI = 'https://www.newstocks.kr/api/auth/login/kakao'
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  
    window.location.href = link

    // console.log('kakao success!!')
  }

  const googleLoginHandler = () => {
    const REST_API_KEY = '679511983072-6lgubsthb92sucrglp1cddt91g29er1n.apps.googleusercontent.com'
    const REDIRECT_URI = 'https://www.newstocks.kr/auth/login/google'
    const link = `https://accounts.google.com/o/oauth2/auth?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&access_type=offline&prompt=consent&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`
    window.location.href = link

    // console.log('google success!!')
  }


  return (
    <div className={styles["buttons-container"]}>

      <div className={styles["greeting-box"]}>
        <div className={styles["greeting"]}>환영합니다!</div> 
        <div>로그인 후 <span>NEWStocks</span>의 다양한 서비스를 이용하세요</div>
      </div>
      <div className={styles["sub-greeting-box"]}>기존 계정으로 편리하게 로그인하세요</div>
      
      <div>
        <button className={styles["social-login-button"]} style={{ backgroundColor: "#F7E600", color: "#3A1D1D"}}
          onClick={kakaoLoginHandler}>
          <div className={styles["social-icon"]}><FaComment size="20"/></div>
          <div className={styles["social-title"]}>카카오 로그인</div>
        </button>

        <button className={styles["social-login-button"]} id={styles["google-box"]} style={{ backgroundColor: "white", color: "black"}}
          onClick={googleLoginHandler}>
          <div className={styles["social-icon"]}><FcGoogle size="20"/></div>
          <div className={styles["social-title"]}>Google 로그인</div>
        </button>
      </div>

      <p className={styles["statement"]}>By proceeding, you agree to our <span>Terms of use</span> and confirm
      you have read our <span>Privacy Statement</span></p>
    </div>
  )
}
