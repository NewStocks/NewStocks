'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useRecoilState } from 'recoil';
import { userInfoState } from '@/recoil/userInfo'; 
import { getUserInfo } from '@/services/userInfo';

import styles from './userpage.module.css';
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";

export default function MyPage() {

  const [ userInfo, setUserInfo ] = useRecoilState(userInfoState);

  //to-do: 로그인할 때 바로 userInfo 들어가도록 하기
  //to-do: 로그인 안 되어있으면 redirect되도록 하기  
  useEffect(() => {
    async function getUserData() {

      try {
        const res = await getUserInfo();
        if (res.status === 200) {
          setUserInfo(res.data); 
        }
      } catch (e) {
        console.error(e); 
      }
    }
    getUserData(); 
  }, [])

  return (
    <div className={styles["main"]}>
      
      <div className={styles["user-info-box"]}>
        <div className={styles["profile-box"]}>
          <div>
            {userInfo && userInfo.profileImage ? <Image width={115} height={115} src={userInfo.profileImage} alt={userInfo.name} className={styles['profile-img']}/> : "" }
          </div>
          <button className={styles["edit-button"]} id={styles["img-edit"]}>Edit</button>
        </div>

        <div className={styles["nickname-box"]}>
          <div className={styles["user-nickname-box"]}>
            <div id={styles["nickname-hello"]}>Hello 👋</div>
            <div id={styles["nickname-curr"]}>{userInfo ? userInfo.name : "사용자"}</div>
          </div>
          <button className={styles["edit-button"]}>Edit</button>
        </div>
      </div>

      <div className={styles["user-middle-box"]}>
        <div className={styles["email"]}>
          <div className={styles["title-mini"]}>이메일</div>
          <div className={styles["email-box"]}>
            <div className={styles["email-box-content"]}>
              <div id={styles["email-user"]}>Anima@gmail.com</div>
              <div id={styles["email-managedby"]}>Managed by Google</div>
            </div>
          </div>
        </div>

        <div className={styles["activity"]}>
          <div className={styles["title-mini"]}>Today</div>
          <div className={styles["activity-container"]}>

            <div className={styles["activity-box"]}>
              <div className={styles["activity-box-content"]}>
                <div className={styles["activity-title"]}>Views</div>
                <div className={styles["activity-box-figure"]}>
                  <div className={styles["activity-figure-left"]}>721K</div>
                  <div className={styles["activity-figure-right"]}>+11.01%  <HiOutlineArrowTrendingUp /></div>
                </div>
              </div>
            </div>

            <div className={styles["activity-box"]} id={styles["activity-second"]}>
              <div className={styles["activity-box-content"]}>
                <div className={styles["activity-title"]}>Visits</div>
                <div className={styles["activity-box-figure"]}>
                  <div className={styles["activity-figure-left"]}>367K</div>
                  <div className={styles["activity-figure-right"]}>+9.15%  <HiOutlineArrowTrendingUp /></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className={styles["user-analysis-box"]}>
        <div className={styles["first-analysis"]}>
          사용자 오답노트 분석 기록 등 ?
        </div>

        <div className={styles["second-analysis"]}>
          사용자 오답노트 분석 기록 등 ?
        </div>
      </div>
    </div>
  )
}