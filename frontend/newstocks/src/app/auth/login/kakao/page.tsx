'use client'
import { useEffect } from 'react';
// import { redirect } from 'next/navigation'
import axios from 'axios';
import { BASE_URL } from '@/utils/url';

export default function KakaoLogin() {
  // const code = window.location.search;
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code', code)
    if (code) {
      axios({
        method: 'post',
        url: `https://www.newstocks.kr/api/auth/login/kakao`,
        data: { code }})
        .then((res) => {
          localStorage.setItem('access-token' , res.data.accessToken)
          window.location.href = '/'
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