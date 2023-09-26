'use client'
import { useEffect } from 'react';
import { redirect } from 'next/navigation'
import axios from 'axios';

export default function KakaoLogin() {
  // const code = window.location.search;
  const code = new URL(document.location.toString()).searchParams.get('code');
  console.log('code', code)
  useEffect(() => {
    axios({
      method: 'post',
      url: `http://localhost:8200/auth/login/kakao`,
      data: { code }})
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem('token', res.data?._token)
        // redirect('/')
      })
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