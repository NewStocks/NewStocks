'use client';
import styles from '../create/createpage.module.css'
import styled from 'styled-components'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
const CreatePostForm = dynamic(() => import('@/components/CreatePostForm/CreatePostForm'))

import { IoIosArrowBack } from 'react-icons/io'

import { Provider } from '@/utils/ChakraProvider'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  color: #4FE7B0;
`

export default function UpdatePage() {
  const [noteId, setNoteId] = useState<string | null>(null)

  useEffect(() => {
    const id = window.location.search;
    const modifiedId = id.replace(/\?/g, '')
    if(modifiedId) {
      setNoteId(modifiedId)
    }

  }, []);

  return (
    <div className={styles["main"]}>
      <div className={styles["top-menu"]}>
        <StyledLink href='/'><IoIosArrowBack /><div>뒤로가기</div></StyledLink>
      </div>
      <Provider>
        <CreatePostForm work="update"/>
      </Provider>
    </div>
  )
}