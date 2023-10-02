'use client'
import styles from './mycards.module.css'
import { useEffect, useState } from 'react';

import { Post } from '@/services/posts' 
import {getMyPosts, getPheedPosts, getScrappedPosts} from '@/services/sortedPosts'

import Card from '@/components/Card/Card';

// type Props = {
//   children: React.ReactNode;
//   // prop으로 받아오는 children의 타입을 지정할 때 
//   // React의 ReactNode라고 지정해주면 된다.
// };

type Props = {
  type: "my" | "scrap" | "following"
}

export default function MyCards({ type }: Props) {
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {

    if (type==="my") {
      getMyPosts()
      .then((res) =>{setPosts(res.data); console.log(res.data)})
    } else if (type==="following") {
      getPheedPosts()
      .then((res) =>{setPosts(res.data); console.log(res.data)})
    } else if (type==="scrap") {
      getScrappedPosts()
      .then((res) => {setPosts(res.data); console.log(res.data)})
    }

  }, [type])

  return <section className={styles["section"]}>
    {posts ? (
      posts?.map((post, index) => <Card key={index} post={post} />)
    )
    : type==="following" ? (
      <div>
        <div className={styles["title-big"]}>🤔 현재 팔로잉 노트가 없습니다 !</div>
        <div>다양한 사용자들을 팔로우하고 보다 많은 노트들을 확인해보세요!</div>
      </div>
    )
    : type==="my" ? (
    <div>
      <div className={styles["title-big"]}>🤔 현재 나의 노트가 없습니다 !</div>
      <div>주식 오답노트를 작성하고 나의 투자를 회고해보세요!</div>
    </div>
    )
    : type==="scrap" ? (
    <div>
      <div className={styles["title-big"]}>🤔 현재 스크랩한 노트가 없습니다 !</div>
      <div>주식 오답노트를 스크랩하고 보다 많은 노트들을 확인해보세요!</div>
    </div>
    )
    : (<div>노트가 없습니다.</div>)}
  
  </section>;
}
