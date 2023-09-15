'use client';

import styles from './createpage.module.css'
import styled from 'styled-components'
import Link from 'next/link';

import CreatePostForm from '@/components/CreatePostForm/CreatePostForm'

import { IoIosArrowBack } from 'react-icons/io'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`
export default function CreatePage() {
  return (
    <div className={styles["main"]}>
      <div className={styles["top-menu"]}>
        <StyledLink href='/'><div><IoIosArrowBack />뒤로가기</div></StyledLink>
        <h2>오답노트 작성</h2>
      </div>

      <CreatePostForm />
    </div>
  )
}