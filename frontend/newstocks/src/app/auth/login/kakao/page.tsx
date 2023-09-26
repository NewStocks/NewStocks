'use client'
import { useEffect } from 'react';
// import { redirect } from 'next/navigation'
import axios from 'axios';

export default function KakaoLogin() {
  // const code = window.location.search;
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code', code)
    if (code) {
      axios({
        method: 'post',
        url: `http://www.newstocks.kr/auth/login/kakao`,
        data: { code }})
        .then((res) => {
          console.log(res);
          localStorage.setItem('token' , res.data?.memberDto.id)
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