'use client'
import styles from './mycards.module.css'
import { useEffect, useState } from 'react';

import { Post } from '@/services/posts' 
import { getMyPosts, getPheedPosts } from '@/services/sortedPosts'

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6; // 페이지당 표시할 카드 수
  const pagesPerBlock = 10; // 각 블록당 표시할 페이지 수
  useEffect(() => {

    if (type==="my") {
      getMyPosts()
      .then((res) =>{setPosts(res.data); console.log(res.data)})
    } else if (type==="following") {
      getPheedPosts()
      .then((res) =>{setPosts(res.data); console.log(res.data)})
    }

  }, [type])

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
    : (<div>노트가 없습니다.</div>)}
    <div>

    </div>
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
  </section>;
}
