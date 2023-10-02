"use client";

import Image from "next/image";

import { UserType } from "@/types/user";

import styles from "./UserInfo.module.css";

type Props = {
  mypage: boolean;
  user: UserType; 
};

export default function UserInfo({ mypage, user }: Props) {

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
        <button className={styles["edit-button"]} id={styles["img-edit"]}>
          Edit
        </button>
      </div>

      <div className={styles["nickname-box"]}>
        <div className={styles["user-nickname-box"]}>
          <div id={styles["nickname-hello"]}>Hello 👋</div>
          <div id={styles["nickname-curr"]}>
            {user ? user.name : "사용자"}
          </div>
        </div>
        <button className={styles["edit-button"]}>Edit</button>
      </div>
    </div>
  );
}
