'use client';
import styles from './CommunityNav.module.css';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { IoIosArrowForward } from "react-icons/io";

export default function CommunityNav() {
  const [mytoggle, setMytoggle] = useState(false);
  const [pagename, setpageName] = useState(null);
  const tabsRef = useRef(null);
  const highlightRef = useRef(null);
  const mynoteRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams) {
      setpageName(searchParams?.get('page'))
    }

    const highlight = highlightRef.current;
    if (tabsRef.current !== null) {
      const tabs = tabsRef.current.querySelectorAll('.tab');

      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
  
          const tabHeight = tab.offsetHeight;
          const tabTop = tab.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top;
          
          if (highlight) {
            highlight.style.height = tabHeight + 'px';
            highlight.style.top = tabTop + 'px';
          }
  
          if (e.target && (e.target).innerHTML=="나의 노트") {
            setMytoggle(true)
            // mynote.style.setProperty("--toggle", "90deg");
          } else {
            setMytoggle(false)
            // mynote.style.setProperty("--toggle", "0deg");
          }
        });
      });
      
      if (pathname?.slice(11)) {
      const selected = tabsRef.current?.querySelector(`.${pathname?.slice(11)}`);

      selected.classList.add('active');
  
      const tabHeight = selected.offsetHeight;
      const tabTop = selected.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top;

      if (highlight) {
      highlight.style.height = tabHeight + 'px';
      highlight.style.top = tabTop + 'px';
      }

      if (pathname?.slice(11)=="mine") {
        setMytoggle(true)
        // mynote.style.setProperty("--toggle", "90deg");
      } else {
        setMytoggle(false)
        // mynote.style.setProperty("--toggle", "0deg");
      }
    }
  }
  }, [])

  return(
    <div className={styles["communitynav-container"]} ref={tabsRef}>
      <div ref={highlightRef} className={`${styles["nav-selected"]} highlight`}>
        <div className={styles["nav-selected-pos"]}></div>
      </div>
      <Link href='/community/user' style={{ textDecoration: "none"}}>
        <div className={`${styles["profile-container"]} tab user`}>
          <div className={styles["profile-box"]}>
            <div className={styles["profile-image"]}></div>
            <div className={styles["profile-name"]}>
              <div>Hello 👋</div>
              <p>Anima Ag.</p>
            </div>
            <div className={styles["profile-button"]}><IoIosArrowForward id={styles["profile-button-icon"]} color="white"/></div>
          </div>
        </div>
      </Link>

      <div className={styles["nav-container"]}>
        <div className={`${styles["nav-mynote"]} tab mine`}>
          <Link ref={mynoteRef} href='/community/mine?page=my' style={{ textDecoration: "none", color: "white"}} onClick={() => setpageName('my')}>
            <p>나의 노트</p>
          </Link>
          {/* <p><IoIosArrowForward className={styles["nav-mynote-arrow"]}/></p> */}
        </div>
        <ul className={styles["nav-mynote-toggle"]} style={{ display: mytoggle ? "block" : "none" }}>
          <Link href='/community/mine?page=my' style={{ textDecoration: "none", color: "white"}} onClick={() => setpageName('my')}>
            <li id={pagename=='my' ? styles["selected"] : ""}>나의 노트</li>
          </Link>
          <Link href='/community/mine?page=scrap' style={{ textDecoration: "none", color: "white"}} onClick={() => setpageName('scrap')}>
            <li id={pagename=='scrap' ? styles["selected"] : ""}>스크랩 노트</li>
          </Link>
          <Link href='/community/mine?page=following' style={{ textDecoration: "none", color: "white"}} onClick={() => setpageName('following')}>
            <li id={pagename=='following' ? styles["selected"] : ""}>팔로잉 노트</li>
          </Link>
        </ul>

        <div className="tab all">
        <Link href='/community/all' style={{ textDecoration: "none", color: "white"}}><p>전체노트</p></Link>
        </div>

        <div className="tab">
          공지사항
        </div>

      </div>
    </div>
  )
}