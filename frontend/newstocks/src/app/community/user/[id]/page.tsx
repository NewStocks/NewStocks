"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUserInfo } from "@/services/userInfo";
import UserInfo from "@/components/UserInfo/UserInfo";
import { UserType } from "@/types/user";

import styles from "./userpage.module.css";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";

type Props = {
  params: {
    id: string;
  };
};

export default function UserPage({ params }: Props) {
  const router = useRouter();


  const [userInfo, setUserInfo] = useState<UserType>({
    id: 0,
    name: "",
    profileImage: "",
  });

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await getUserInfo();

        if (res.status === 200) {
          if (res.data.id.toString() === params.id) {
            router.push("/community/user/me");
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    checkUser(); 
  }, []);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await getUserInfo(params.id);
        if (res.status === 200) {
          setUserInfo(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getUserData();
  }, []);

  return (
    <div className={styles["main"]}>
      {userInfo && <UserInfo mypage={false} user={userInfo} />}

      <div className={styles["user-middle-box"]}>
        {/* <div className={styles["email"]}>
          <div className={styles["title-mini"]}>이메일</div>
          <div className={styles["email-box"]}>
            <div className={styles["email-box-content"]}>
              <div id={styles["email-user"]}>Anima@gmail.com</div>
              <div id={styles["email-managedby"]}>Managed by Google</div>
            </div>
          </div>
        </div> */}

        {/* <div className={styles["activity"]}>
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
        </div> */}
      </div>
    </div>
  );
}
