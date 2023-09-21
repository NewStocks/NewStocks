'use client';
import React from 'react';

import styles from './Header.module.css';
import Link from 'next/link';

// 검색창 아이콘
import { BiSearch } from "react-icons/bi"
// 메뉴 아이콘
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";

import LoginModal from '@/components/LoginModal/LoginModal'

// type User = {
//   name: string;
// };

// interface HeaderProps {
//   user?: User;
//   onLogin: () => void;
//   onLogout: () => void;
//   onCreateAccount: () => void;
// }

export default function Header() {

return (
  <header>
    <div className={styles["header"]}>
      <div className={styles["header-left"]}>
        <svg width="30" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </g>
        </svg>
        <h1>NEWStocks</h1>
      </div>
      
      <div className={styles["header-search"]}>
        <div><BiSearch size="22"/></div>
        <input type="text" placeholder="종목명 또는 종목코드 검색" />
      </div>

      
      <div className={styles["header-right"]}>
        <Link className={styles["header-link"]} href='/'><BiHomeAlt2 size="29"/></Link>
        <Link className={styles["header-link"]} href='/community'><AiOutlineGlobal size="28"/></Link>
        <LoginModal type="header"/>
        {/* <Link className={styles["header-link"]} href='/community/user'><FaRegUserCircle size="27"/></Link> */}
      </div>
    </div>
  </header>
);
}
