'use client';

import styles from './TabHeader.module.css'
import styled from 'styled-components'

import { useState } from 'react';
import Link from 'next/link';
import { LiaChartPieSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMegaphoneOutline } from "react-icons/io5";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  `
export default function TabHeader() {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const handleIconClick = (index: number) => {
    setSelectedIconIndex(index);
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["header"]}>
        <StyledLink href="?tab=company">
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 0 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(0)}
        >
          <LiaChartPieSolid id={styles["item-icon"]} />
          <div className={styles["item-text"]}>기업 정보</div>
        </div>
        </StyledLink>

        <StyledLink href="?tab=more">
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 1 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(1)}
        >
          <IoMegaphoneOutline id={styles["item-icon"]} />
          <div className={styles["item-text"]}>관련 정보</div>
        </div>
        </StyledLink>

        <StyledLink href="?tab=notes">
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 2 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(2)}
        >
          <IoDocumentTextOutline id={styles["item-icon"]} />
          <div className={styles["item-text"]}>오답 노트</div>
        </div>
        </StyledLink>

        <StyledLink href="?tab=chat">
        <div
          className={`${styles["header-item"]} ${selectedIconIndex === 3 ? styles["selected-item"] : ''}`}
          onClick={() => handleIconClick(3)}
        >
          <IoChatbubbleEllipsesOutline id={styles["item-icon"]} />
          <div className={styles["item-text"]}>AI 챗봇</div>
        </div>
        </StyledLink>
      </div>
    </div>

  )
}