"use client";
import { useState } from "react";
import Image from "next/image";

import { useRecoilState } from 'recoil';
import { userInfoState } from '@/recoil/userInfo'; 
import { UserType } from "@/types/user";
import { editUserInfo } from "@/services/userInfo";

import styles from "./UserInfo.module.css";

type Props = {
  mypage: boolean;
  user: UserType;
};

export default function UserInfo({ mypage, user }: Props) {
  const [editingUsername, setEditingUsername] = useState(false);
  const [ editedUsername, setEditedUsername ] = useState(""); 
  const [userInfo, setUserInfo ] = useRecoilState(userInfoState);

  const handleEditUserName = () => {
    if (!editingUsername) {
      setEditedUsername(user.name);
    }
    setEditingUsername(!editingUsername);
    return;
  };

  const handleConfirmEditUserName = async () => {

    if (editedUsername.trim() === "") {
      setEditingUsername(!editingUsername)
      return; 
    }

    try {
      const res = await editUserInfo({name: editedUsername})
      console.log(res.data)
      if (res.status === 200 ) {
        console.log(typeof res.data)
        setUserInfo(res.data as UserType); 
      
      }
    } catch (e) {
      alert("닉네임 변경에 실패했습니다.")
      console.error(e); 
    } finally {
      setEditingUsername(!editingUsername)
    }
  }

  return (
    <div className={styles["user-info-box"]}>
      <div className={styles["profile-box"]}>
        <div>
          {user && user.profileImage ? (
            <Image
              width={115}
              height={115}
              src={user.profileImage}
              alt={user.name}
              className={styles["profile-img"]}
            />
          ) : (
            ""
          )}
        </div>
        {mypage && (
          <button className={styles["edit-button"]} id={styles["img-edit"]}>
            Edit
          </button>
        )}
      </div>

      <div className={styles["nickname-box"]}>
        <div className={styles["user-nickname-box"]}>
          <div id={styles["nickname-hello"]}>Hello 👋</div>
          <div
            id={styles["nickname-curr"]}
            style={{ display: editingUsername ? "none" : "block" }}
          >
            {user ? user.name : "사용자"}
          </div>
          <input
            className={styles["nickname-change-input"]}
            style={{ display: editingUsername ? "inline" : "none" }} value={editedUsername} onChange={(e)=>setEditedUsername(e.target.value)}
          />
        </div>
        {mypage && (
          <button
            className={styles["edit-button"]}
            onClick={handleEditUserName}
            style={{ display: editingUsername ? "none" : "block" }}
          >
            수정
          </button>
        )}
        {mypage && (
          <div>
            <button
              className={styles["cancel-button"]}
              style={{ display: editingUsername ? "inline" : "none" }}
              onClick={handleEditUserName}
            >
              취소
            </button>
            <button
              className={styles["edit-button"]}
              style={{ display: editingUsername ? "inline" : "none" }}
              onClick={handleConfirmEditUserName}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
