'use client';
import styles from './createpage.module.css'
import styled from 'styled-components'
import Link from 'next/link';
import { useEffect } from 'react';
import dynamic from 'next/dynamic'
const CreatePostForm = dynamic(() => import('@/components/CreatePostForm/CreatePostForm'))

import { IoIosArrowBack } from 'react-icons/io'

import { Provider } from '@/utils/ChakraProvider'
import { useRouter } from 'next/navigation';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  color: #4FE7B0;
`

export default function CreatePage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["top-menu"]}>
        <div style={{ display: "flex"}} onClick={handleGoBack}>
          <IoIosArrowBack style={{ marginTop: "3px"}}/><button>뒤로가기</button>
        </div>
      </div>
      <Provider>
        <CreatePostForm work="create"/>
      </Provider>
    </div>
  )
}