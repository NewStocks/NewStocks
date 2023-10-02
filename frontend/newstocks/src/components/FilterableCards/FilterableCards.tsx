'use client';
import styles from './filterablecards.module.css'
import { useEffect, useState } from 'react';

import { Post, getPostsAll } from '@/services/posts' 

import Card from '@/components/Card/Card';

import { getMyPosts } from '@/services/sortedPosts'

export default function FilterableCards() {
  const [posts, setPosts] = useState<Post[] | null>([])

  useEffect(() => {
    getPostsAll().then((res) =>{setPosts(res.data); console.log(res.data)})
  }, [])

  return <section className={styles["section"]}>
    {posts?.map((post, index) => <Card key={index} post={post} />)}
  </section>;
}