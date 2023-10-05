"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoil/userInfo";
import { deleteUser, getUserInfo } from "@/services/userInfo";
import { getMyPosts } from "@/services/sortedPosts";
import UserInfo from "@/components/UserInfo/UserInfo";
import { getAccessToken } from "@/utils/token";
import { Post } from "@/services/posts";

import styles from "./mypage.module.css";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from "react-icons/hi2";

type Props = {
  params: {
    id: string;
  };
};

export default function MyPage({ params }: Props) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [thisMonthProfit, setThisMonthProfit] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push("/community");
      return;
    }
    async function getUserData() {
      try {
        const res = await getUserInfo();
        if (res.status === 200) {
          setUserInfo(res.data);
        }
      } catch (e) {
        // console.error(e);
      }
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getMyPostsForMyPage() {
      try {
        const res = await getMyPosts();

        if (res.status === 200) {
          const myPosts = res.data;
          let totalProfitCalc = 0;
          let thisMonthProfitCalc = 0;
          const currentMonth = new Date().getMonth();
          myPosts.forEach((post: Post) => {
            if (
              post.type === "BUY_SELL" &&
              post.buyQuantity &&
              post.sellQuantity &&
              post.sellPrice &&
              post.buyPrice
            ) {
              const profitPerPost =
                parseInt(post.sellPrice) * parseInt(post.sellQuantity) -
                parseInt(post.buyPrice) * parseInt(post.buyQuantity);

              totalProfitCalc += profitPerPost;
              if (
                post.sellDate &&
                new Date(post.sellDate).getMonth() === currentMonth
              ) {
                thisMonthProfitCalc += profitPerPost;
              }
            }
          });

          setTotalProfit(totalProfitCalc);
          setThisMonthProfit(thisMonthProfitCalc);
        }
      } catch (e) {
        // console.error(e);
      }
    }
    getMyPostsForMyPage();
  }, []);

  const handleLogout = () => {
    // 로그아웃 버튼을 눌렀을 때 실행될 코드
    localStorage.removeItem("access-token"); // access-token 제거
    window.location.href="/";
  };

  const handleDeleteToast = async () => {
    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonText: "탈퇴",
      confirmButtonColor: "red",
      cancelButtonText: "취소",
      focusConfirm: false,
      focusCancel: true,
      background: "rgb(38, 39, 48)",
      color: "white",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteUser();
          Swal.fire({
            title: "탈퇴되셨습니다.",
            confirmButtonText: "확인",
            background: "rgb(38, 39, 48)",
            color: "white",
          }).then(() => {
            router.push("/community");
          });
        } catch (e) {
          Swal.fire({
            title: "탈퇴에 실패하셨습니다",
            confirmButtonText: "확인",
            background: "rgb(38, 39, 48)",
            color: "white",
          });
        }
      }
    });
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["user-info-box"]}>
        {userInfo && <UserInfo mypage={true} user={userInfo} />}
        <button className={styles["logout-button"]} onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      {/* <div className={styles["user-middle-box"]}> */}
      {/* <div className={styles["email"]}>
          <div className={styles["title-mini"]}>이메일</div>
          <div className={styles["email-box"]}>
            <div className={styles["email-box-content"]}>
              <div id={styles["email-user"]}>Anima@gmail.com</div>
              <div id={styles["email-managedby"]}>Managed by Google</div>
            </div>
          </div>
        </div> */}

      <div className={styles["activity"]}>
        <div className={styles["title-mini"]}>나의 수익률</div>
        <div className={styles["activity-container"]}>
          <div className={styles["activity-box"]}>
            <div className={styles["activity-box-content"]}>
              <div className={styles["activity-title"]}>이번 달 수익률</div>
              <div className={styles["activity-box-figure"]}>
                <div
                  className={styles["activity-figure-left"]}
                >{`${thisMonthProfit.toLocaleString()}원`}</div>
                <div className={styles["activity-figure-right"]}>
                  {thisMonthProfit > 0 ? (
                    <HiOutlineArrowTrendingUp size={30} />
                  ) : thisMonthProfit < 0 ? (
                    <HiOutlineArrowTrendingDown size={30} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles["activity-box"]}
            id={styles["activity-second"]}
          >
            <div className={styles["activity-box-content"]}>
              <div className={styles["activity-title"]}>현재 총 수익률</div>
              <div className={styles["activity-box-figure"]}>
                <div
                  className={styles["activity-figure-left"]}
                >{`${totalProfit.toLocaleString()}원`}</div>
                <div className={styles["activity-figure-right"]}>
                  {totalProfit > 0 ? (
                    <HiOutlineArrowTrendingUp size={30} />
                  ) : totalProfit < 0 ? (
                    <HiOutlineArrowTrendingDown size={30} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className={styles["user-analysis-box"]}>
        <div className={styles["first-analysis"]}>
          사용자 오답노트 분석 기록 등 ?
        </div>

        <div className={styles["second-analysis"]}>
          사용자 오답노트 분석 기록 등 ?
        </div>
      </div> */}

      <button
        type="button"
        className={styles["delete-button"]}
        onClick={handleDeleteToast}
      >
        탈퇴하기
      </button>
    </div>
  );
}
