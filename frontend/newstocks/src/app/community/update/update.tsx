'use client';
import styles from '../create/createpage.module.css'
import styled from 'styled-components'
import Link from 'next/link';
import { useEffect } from 'react';
import dynamic from 'next/dynamic'
const CreatePostForm = dynamic(() => import('@/components/CreatePostForm/CreatePostForm'))

import { IoIosArrowBack } from 'react-icons/io'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export default function UpdatePage() {

  const onAlertModalOpen = () => {
    // alert('정말 뒤로 가시겠습니까 ?????')
  }

  const browserPreventEvent = (event: () => void) => {
    history.pushState(null, "", location.href);
    console.log(location.href)
    event();
  };

  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", () => {
      browserPreventEvent(onAlertModalOpen);
    });
    return () => {
      window.removeEventListener("popstate", () => {
        browserPreventEvent(onAlertModalOpen);
      });
    };
  }, []);

  return (
    <div className={styles["main"]}>
      <div className={styles["top-menu"]}>
        <StyledLink href='/'><div><IoIosArrowBack />뒤로가기</div></StyledLink>
      </div>
      <CreatePostForm type="update"/>
    </div>
  )
}