'use client'
import { useEffect } from 'react';
// import { redirect } from 'next/navigation'
import axios from 'axios';
import { BASE_URL } from '@/utils/url';
import { getUserInfo } from '@/services/userInfo';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/recoil/userInfo';
import { UserType } from '@/types/user';

export default function KakaoLogin() {
  // const code = window.location.search;

  const [ userInfo, setUserInfo ] = useRecoilState(userInfoState);
  
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code', code)
    if (code) {
      axios({
        method: 'post',
        url: `http://localhost:8200/auth/login/kakao`,
        data: { code }})
        .then((res) => {
          localStorage.setItem('access-token' , res.data.accessToken)
          getUserInfo()
          .then((res) => {
            setUserInfo(res.data as UserType);
            window.location.href = '/'
          })
          .catch((e)=> {
            window.location.href = '/'
          })
        })
        .catch((error) => {
          console.error("에러 발생:", error);
        })
      }
    })

  return <div>로그인 중입니다.</div>;
}

// axios({
//   method: 'get',
//   url: '주소',
//   header: {
//     authorization: `Bearer ${localStorage.getItem('token')}`
//   }
// })