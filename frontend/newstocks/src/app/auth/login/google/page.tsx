'use client'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/url';

export default function GoogleLogin() {
  useEffect(() => {
    // console.log("redirect URL: ", document.location.toString())
    const code = new URL(document.location.toString()).searchParams.get('code');
    // console.log('code', code)
    if (code) {
      axios({
        method: 'post',
        // url: `${BASE_URL}/auth/login/google`,
        url: `http://localhost:8200/auth/login/google`,
        data: { code }})
        .then((res) => {
          localStorage.setItem('access-token' , res.data.accessToken)
          window.location.href = '/'
        })
      }
    })

  return <div>로그인 중입니다.</div>;
}