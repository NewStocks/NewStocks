"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoil/userInfo";
import { UserType } from "@/types/user";
import {
  editUserInfo,
  getFollowingInfo,
  followUser,
  unfollowUser,
  getFollowerList,
  getFollowingList
} from "@/services/userInfo";

import styles from "./UserInfo.module.css";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import Link from 'next/link';

type Props = {
  mypage: boolean;
  user: UserType;
};

export default function UserInfo({ mypage, user }: Props) {
  const [editingUsername, setEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isFollowing, setIsFollowing] = useState(false);
  const [follower, setFollower] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);

  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  useEffect(() => {
    async function checkFollowingList() {
      try {
        const res = await getFollowingInfo();
        if (res.status === 200) {
          const followingList = res.data;
          const containsUser = followingList.some((followinguser: UserType) => {
            return followinguser.id === user.id;
          });
          setIsFollowing(containsUser);
        }
      } catch (e) {
        // console.error(e);
      }
    }
    async function getFollower() {
      const res = await getFollowerList();
      if (res.status === 200) {
        console.log("follower", res.data);
        setFollower(res.data)
      }
    }
    async function getFollowing() {
      const res = await getFollowingList();
      if (res.status === 200) {
        console.log("following", res.data)
        setFollowing(res.data)
      }
    }
    checkFollowingList();
    getFollower();
    getFollowing();

  }, [user]);

  const handleEditPfpFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await editUserInfo({ multipartFile: file });

        // console.log(res.data);

        if (res.status === 200) {
          setUserInfo(res.data as UserType);
        }
      } catch (e) {
        alert("프로필사진 변경에 실패했습니다.");
        // console.error(e);
      }
    }
  };

  const editUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    console.log(inputText)
    
    // 정규 표현식을 사용하여 허용되는 문자 패턴을 정의
    const allowedPattern = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;

    // 입력 값이 허용된 패턴과 일치하지 않으면 업데이트하지 않음
    if (!allowedPattern.test(inputText)) {
      alert("닉네임에는 한글, 영어, 숫자만 사용해주세요")
      return;
    }

    setEditedUsername(inputText)
  }

  const handleEditUserName = () => {
    if (!editingUsername) {
      setEditedUsername(user.name);
    }
    setEditingUsername(!editingUsername);
    return;
  };

  const handleConfirmEditUserName = async () => {
    if (editedUsername.trim() === "") {
      setEditingUsername(!editingUsername);
      return;
    }

    try {
      const res = await editUserInfo({ name: editedUsername });
      // console.log(res.data);
      if (res.status === 200) {
        setUserInfo(res.data as UserType);
      }
    } catch (e) {
      alert("닉네임 변경에 실패했습니다.");
      // console.error(e);
    } finally {
      setEditingUsername(!editingUsername);
    }
  };

  const handleFollow = async () => {
    if (user.id === 0) {
      return;
    }

    try {
      const res = await followUser(user.id);
      // console.log(res);

      if (res.status === 200) {
        setIsFollowing(!isFollowing);
      }
    } catch (e) {
      // console.error(e);
    }
  };

  const handleUnfollow = async () => {
    if (user.id === 0) {
      return; 
    }

    try {
      const res = await unfollowUser(user.id);
      // console.log(res); 

      if (res.status === 200) {
        setIsFollowing(!isFollowing); 
      }

    } catch (e) {
      // console.error(e);
    }
  };

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
          <>
            <input
              type="file"
              name="editProfileImage"
              id="editProfileImage"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleEditPfpFile}
            />
            <label
              className={`${styles["edit-button"]} ${styles["img-edit"]}`}
              htmlFor="editProfileImage"
            >
              수정
            </label>
          </>
        )}
      </div>

      <div className={styles["nickname-box"]}>
        <div className={styles["user-nickname-box"]}>
          <div id={styles["nickname-hello"]}>Hello 👋</div>
          <div className={styles["nickname-button-box"]}>
            <div
              id={styles["nickname-curr"]}
              style={{ display: editingUsername ? "none" : "block" }}
            >
              {user ? user.name : "사용자"}
            </div>
            {!mypage &&
              (isFollowing ? (
                <button
                  className={`${styles["unfollow-button"]}`}
                  onClick={handleUnfollow}
                >
                  <BiUserMinus size="35" />
                </button>
              ) : (
                <button
                  className={styles["follow-button"]}
                  onClick={handleFollow}
                >
                  <BiUserPlus size="35" />
                </button>
              ))}
          </div>

          <input
            className={styles["nickname-change-input"]}
            style={{ display: editingUsername ? "inline" : "none" }}
            value={editedUsername}
            maxLength={8}
            onChange={editUserName}
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
      {/* 내 페이지일때 팔로잉 팔로우 */}
      {mypage && (
        <div className={styles["follows"]}>
          <div className={styles["follow-box"]}>
            <h2 onClick={() => setShowFollowerList(!showFollowerList)} className={styles["follow-head"]}>
              Follower: {follower.length}
            </h2>
            {showFollowerList && (
              <div className={`${styles["scroll-box"]}`}>
                {follower.map((followerItem, index) => (
                  <Link key={index} className={styles["follow-content"]} href={`/community/user/${followerItem.id}`}>
                    <Image
                      width={30}
                      height={30}
                      src={followerItem.profileImage}
                      alt={followerItem.name}
                      className={styles["follow-image"]}
                    />
                    <p>{followerItem.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className={styles["follow-box"]}>
            <h2 onClick={() => setShowFollowingList(!showFollowingList)} className={styles["follow-head"]}>
              Following : {following.length}
            </h2>
            {showFollowingList && (
              <div className={`${styles["scroll-box"]}`}>
                {following.map((followingItem, index) => (
                  <Link key={index} className={styles["follow-content"]} href={`/community/user/${followingItem.id}`}>
                    <Image
                      width={30}
                      height={30}
                      src={followingItem.profileImage}
                      alt={followingItem.name}
                      className={styles["follow-image"]}
                    />
                    <p>{followingItem.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* 남의 페이지일떄 팔로잉 팔로우 */}
      {!mypage && (
        <div className={styles["follows"]}>
          <div className={styles["follow-box"]}>
            <h2 onClick={() => setShowFollowerList(!showFollowerList)} className={styles["follow-head"]}>
              Follower: {follower.length}
            </h2>
            {showFollowerList && (
              <div className={`${styles["scroll-box"]}`}>
                {follower.map((followerItem, index) => (
                  <Link key={index} className={styles["follow-content"]} href={`/community/user/${followerItem.id}`}>
                    <Image
                      width={30}
                      height={30}
                      src={followerItem.profileImage}
                      alt={followerItem.name}
                      className={styles["follow-image"]}
                    />
                    <p>{followerItem.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className={styles["follow-box"]}>
            <h2 onClick={() => setShowFollowingList(!showFollowingList)} className={styles["follow-head"]}>
              Following : {following.length}
            </h2>
            {showFollowingList && (
              <div className={`${styles["scroll-box"]}`}>
                {following.map((followingItem, index) => (
                  <Link key={index} className={styles["follow-content"]} href={`/community/user/${followingItem.id}`}>
                    <Image
                      width={30}
                      height={30}
                      src={followingItem.profileImage}
                      alt={followingItem.name}
                      className={styles["follow-image"]}
                    />
                    <p>{followingItem.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
