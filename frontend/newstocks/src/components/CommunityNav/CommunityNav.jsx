'use client';
import styles from './CommunityNav.module.css';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAccessToken } from '@/utils/token';
import LoginModal from '@/components/LoginModal/LoginModal'
import { getUserInfo } from '@/services/userInfo';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/recoil/userInfo';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';

export default function CommunityNav() {
  const [mytoggle, setMytoggle] = useState(false);
  const [pagename, setpageName] = useState(null);
  const [highlight, setHighlight] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const tabsRef = useRef(null);
  const highlightRef = useRef(null);
  const mynoteRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  function mineToggle(pathname) {
    if (pathname?.slice(11)=="mine") {
      setMytoggle(true)
      // mynote.style.setProperty("--toggle", "90deg");
    } else {
      setMytoggle(false)
      // mynote.style.setProperty("--toggle", "0deg");
    }
  }

  function switchHighlight() {
    if (pathname?.slice(11)) {
      const path = pathname?.slice(11)
      if (path=='mine' | path=='all' | path=='notice' | path=='create') {
      const tabs = tabsRef.current.querySelectorAll('.tab');
      const highlight = highlightRef.current;
      
      const selected = tabsRef.current?.querySelector(`.${path}`);
      
        selected.classList.add('active');
    
        const tabHeight = selected.offsetHeight;
        const tabTop = selected.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top;
    
        if (highlight) {
        highlight.style.height = tabHeight + 'px';
        highlight.style.top = tabTop + 'px';
        }
      }
    }
  }

  async function switchPath() {
    mineToggle(pathname)
    setTimeout(async () => {
      await switchHighlight()
    }, 100);
  }

  useEffect(()=> {

    async function getUserBasicInfo() {
      try {
        const res = await getUserInfo();
        if (res.status === 200) {
          setUserInfo(res.data); 
        }
      } catch (e) {
        console.error(e);
      }
    }

    const token = getAccessToken();

    if (token && token.trim()) {
      setIsLoggedIn(true); 
      getUserBasicInfo(); 
    }

    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    setHighlight(false)
    mineToggle(pathname)
    if (pathname?.slice(11)) {
      const path = pathname?.slice(11)
      if (path=='mine' | path=='all' | path=='notice' | path=='create') {
        setHighlight(true)
        setTimeout(async () => {
          switchPath()
        }, 100);
      } else {
        setHighlight(false)
      }
  // eslint-disable-next-line 
  }}, [pathname])
  
  useEffect(() => {
    if (pathname?.slice(11)) {
      
      if (searchParams) {
        setpageName(searchParams?.get('page'))
      }

      const highlight = highlightRef.current;
      if (tabsRef.current !== null) {
        const tabs = tabsRef.current.querySelectorAll('.tab');

        if (pathname?.slice(11)=="mine") {
          setMytoggle(true)
          // mynote.style.setProperty("--toggle", "90deg");
        } else {
          setMytoggle(false)
          // mynote.style.setProperty("--toggle", "0deg");
        }
        
        if (pathname?.slice(11)) {
          const path = pathname?.slice(11)
          if (path=='mine' | path=='all' | path=='notice' | path=='create') {
          const selected = tabsRef.current?.querySelector(`.${path}`);

          selected.classList.add('active');
          
          const tabHeight = selected.offsetHeight;
          const tabTop = selected.getBoundingClientRect().top - tabs[0].getBoundingClientRect().top;

          if (highlight) {
            highlight.style.height = tabHeight + 'px';
            highlight.style.top = tabTop + 'px';
          }
        }
      }}
  // eslint-disable-next-line 
  }}, [])
  
  return(
    <>
    {/* {isModalOpen && (
    <>
      <div className={styles["overlay"]}></div>
      <LoginModal />
    </>
    )} */}
    <div className={styles["communitynav-container"]} ref={tabsRef}>
      {highlight && <div ref={highlightRef} className={`${styles["nav-selected"]} highlight`}>
        <div className={styles["nav-selected-pos"]}></div>
      </div>}
      {/* <Link href='/community/user' style={{ textDecoration: "none"}}>
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
      </Link> */}
      
      <div className={`${styles["profile-container"]} tab user`}>
        {isLoggedIn ? (
          <Link href="/community/user/me" style={{textDecoration: "none"}}>
            <div className={styles["profile-box"]}>
              <div className={styles["profile-image"]}>
                <Image width={37} height={37} src={userInfo.profileImage} className={styles["profile-image-pic"]}/>
              </div>
              <div className={styles["profile-name"]}>
                <div>Hello 👋</div>
                <p className={styles["profile-name-text"]}>{userInfo.name}</p>
              </div>
              <div className={styles["profile-button"]}>
                <IoIosArrowForward
                  id={styles["profile-button-icon"]}
                  color="white"
                />
              </div>
            </div>
          </Link>
          ) : (
            <LoginModal type="nav" />
        )}
       
      </div>

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

        <div className="tab notice">
          <Link href='/community/notice' style={{ textDecoration: "none", color: "white"}}><p>공지사항</p></Link>
        </div>

        <div className="tab create">
          <Link href='/community/create' style={{ textDecoration: "none", color: "white"}}><p>글 작성 임시버튼</p></Link>
        </div>

      </div>
    </div>

  </>
  )
}