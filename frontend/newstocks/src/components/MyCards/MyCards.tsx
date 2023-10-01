'use client'
import styles from './mycards.module.css'
import { useEffect, useState } from 'react';

import { Post } from '@/services/posts' 
import { getMyPosts } from '@/services/sortedPosts'

import Card from '@/components/Card/Card';

// type Props = {
//   children: React.ReactNode;
//   // prop으로 받아오는 children의 타입을 지정할 때 
//   // React의 ReactNode라고 지정해주면 된다.
// };

export default function MyCards() {
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {
    getMyPosts().then((res) =>{setPosts(res.data); console.log(res.data)})
  }, [])

  return <section className={styles["section"]}>
    {posts?.map((post, index) => <Card key={index} post={post} />)}
  </section>;
}
