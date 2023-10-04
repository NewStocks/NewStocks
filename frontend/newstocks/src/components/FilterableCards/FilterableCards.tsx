'use client';
import styles from './filterablecards.module.css'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '@/utils/url'
import { addAccessTokenToHeaders } from '@/utils/token';

import { Post, getPostsAll } from '@/services/posts' 

import Card from '@/components/Card/Card';

type Props = {
  type: string | null
  key?: string | null
}

export default function FilterableCards({type, key}: Props) {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[] | null>([])
  // const [currFilter, setCurrFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6; // 페이지당 표시할 카드 수
  const pagesPerBlock = 10; // 각 블록당 표시할 페이지 수

  useEffect(() => {
    const getItem = searchParams.get('filter')
    const hasKeyword = searchParams.has('key')
    // console.log(type, key)

    if (!hasKeyword) {
      axios({
        method: 'get',
        url: `${BASE_URL}/review-note/${getItem}`,
        headers: addAccessTokenToHeaders(),
      }).then((res) => setPosts(res.data))
    } else if (getItem==="fild-keyword") {
      const getKey = searchParams.get('key')
      axios({
        method: 'get',
        url: `${BASE_URL}/review-note/${getItem}/${getKey}`,
        headers: addAccessTokenToHeaders(),
      }).then((res) => setPosts(res.data))
    } else {
      const getKey = searchParams.get('key')
      axios({
        method: 'get',
        url: `${BASE_URL}/review-note/find-all`,
        headers: addAccessTokenToHeaders(),
      }).then((res) => res.data)
      .then((notes) => notes.filter((note: Post) => note.stockDto.id===`${getKey}`))
      .then((res) => setPosts(res))
    }

  }, [type || key])

  useEffect(() => {
    console.log('currPage', currentPage)
  }, [currentPage])

  if (!posts) {
    return <div>Loading...</div>; // 로딩 중 처리 (선택 사항)
  }

  // 현재 페이지의 카드 목록 계산
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const totalBlocks = Math.ceil(totalPages / pagesPerBlock);
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(currentBlock * pagesPerBlock, totalPages);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handlePrevBlock = () => {
    setCurrentPage(startPage - 1);
  };

  const handleNextBlock = () => {
    setCurrentPage(endPage + 1);
  };

  return (
    <>
      <section className={styles['section']}>
        {posts.length > 0 ? (posts
        .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
        .map((post, index) => (
            <Card key={index} post={post} />
        )))
        :(
          <>
          <div style={{ fontWeight: "550", fontSize: "30px"}}>🤔 해당하는 노트가 없습니다!</div>
          </>
        )}

      </section>
      <div className={styles['page-button-box']}>
        {currentBlock > 1 && (
            <button
                className={`${styles['page-button']} ${styles['prev-button']}`}
                onClick={handlePrevBlock}
            >
              이전
            </button>
        )}

        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
            <button
                key={startPage + index}
                className={`${styles['page-button']} ${
                    startPage + index === currentPage ? styles['active'] : ''
                }`}
                onClick={() => handlePageChange(startPage + index)}
            >
              {startPage + index}
            </button>
        ))}

        {currentBlock < totalBlocks && (
            <button
                className={`${styles['page-button']} ${styles['next-button']}`}
                onClick={handleNextBlock}
            >
              다음
            </button>
        )}
      </div>
    </>
  );
}