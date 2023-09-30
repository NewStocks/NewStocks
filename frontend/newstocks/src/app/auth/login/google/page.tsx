'use client'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/url';

export default function GoogleLogin() {
  useEffect(() => {
    console.log("redirect URL: ", document.location.toString())
    const code = new URL(document.location.toString()).searchParams.get('code');
    console.log('code', code)
    if (code) {
      axios({
        method: 'post',
        url: `http://localhost:8200/auth/login/google`,
        // url: `${BASE_URL}/auth/login/google`,
        data: { code }})
        .then((res) => {
          console.log(res);
          // localStorage.setItem('token' , res.data?.memberDto.id)
          localStorage.setItem('token' , res.data.accessToken)
          console.log("멤버", res.data)
          // window.location.href = '/'
        })
      }
    })

  return <div>로그인 중입니다.</div>;
}