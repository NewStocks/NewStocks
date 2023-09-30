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
        url: `http://localhost:8200/auth/login/kakao`,
        // url: `${BASE_URL}/auth/login/kakao`,
        data: { code }})
        .then((res) => {
          console.log("result", res);
          // localStorage.setItem('token' , res.data?.memberDto.id)
          localStorage.setItem('token' , res.data.accessToken)
          console.log("멤버", res.data)
          window.location.href = '/'
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