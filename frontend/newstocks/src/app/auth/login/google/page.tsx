'use client'
import { useEffect } from 'react';
import axios from 'axios';

export default function KakaoLogin() {
  useEffect(() => {
    console.log("redirect URL: ", document.location.toString())
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code', code)
    if (code) {
      axios({
        method: 'post',
        url: `http://localhost:8200/auth/login/google`,
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