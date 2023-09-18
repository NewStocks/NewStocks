'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Newstab.module.css'

type NewsItem = {
  x: string;
  y: any[];
};

type GroupedNewsData = {
  date: string;
  newsItems: NewsItem[];
};

// Pagination 컴포넌트 
function Pagination({ currentPage, totalPageCount, onPageChange }: { currentPage: number, totalPageCount: number, onPageChange: (page: number) => void }) {
  const pageNumbers = Array.from({ length: totalPageCount }, (_, index) => index + 1);

  // 페이지 그룹 나누기 
  const totalPagesToShow = 5; // 한 번에 표시할 페이지 번호 개수
  const totalPagesInGroup = Math.ceil(totalPageCount / totalPagesToShow);
  const currentPageGroup = Math.ceil(currentPage / totalPagesToShow);

  // 현재 페이지 그룹에 표시할 페이지 번호
  const startPage = (currentPageGroup - 1) * totalPagesToShow + 1;
  const endPage = Math.min(startPage + totalPagesToShow - 1, totalPageCount);

  return (
    <div className={styles["pagination"]}>
      {currentPageGroup > 1 && (
        <button
          className={styles["pagebutton"]}
          onClick={() => onPageChange(startPage - 1)}
        >
          이전
        </button>
      )}
      {currentPageGroup === 1 && (
        <button className={styles["pagebutton"]} disabled>
          이전
        </button>
      )}

      {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles["pagenumber"]} ${currentPage === pageNumber ? styles["active"] : ""}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {currentPageGroup < totalPagesInGroup && (
        <button
          className={styles["pagebutton"]}
          onClick={() => onPageChange(endPage + 1)}
        >
          다음
        </button>
      )}
  
      {currentPageGroup === totalPagesInGroup && (
        <button className={styles["pagebutton"]} disabled>
          다음
        </button>
      )}
    </div>
  );
}

export default function Newstab() {
  const tabName = usePathname() || '';
  const code = tabName.split('/').filter(Boolean)[0];

  const [newsData, setNewsData] = useState<GroupedNewsData[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 페이지당 뉴스 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  useEffect(() => {
    const fetchData = () => {
      axios({
        method: 'get',
        url: `http://localhost:8200/stock/find-chart/${code}`,
      })
        .then((res) => {
          const newsItems: NewsItem[] = res.data.series[1].data;
          console.log(newsItems)
          // 같은 날짜별로 그룹화 하기
          const groupedNewsData: GroupedNewsData[] = newsItems.reduce(
            (acc: GroupedNewsData[], currentItem: NewsItem) => {
              const currentDate = currentItem.x;
              const existingGroup = acc.find((group) => group.date === currentDate);

              if (existingGroup) {
                existingGroup.newsItems.push(currentItem);
              } else {
                acc.push({ date: currentDate, newsItems: [currentItem] });
              }

              return acc;
            },
            []
          );

          setNewsData(groupedNewsData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [code]);

  useEffect(() => {
    const fetchData = () => {
      axios({
        method: 'get',
        url: `http://localhost:8200/news/find/${code}`,
      })
        .then((res) => {
          console.log(res.data[0])
          const date = new Date(res.data[0].publishTime).getTime()
          console.log(date)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();



  }, [code]);
  // 현재 페이지에 해당하는 뉴스 아이템만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.flatMap((group) => group.newsItems).slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPageCount = Math.ceil(newsData.flatMap((group) => group.newsItems).length / itemsPerPage);

  // 페이지 변경 처리 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles["newsmain"]}>
      <div className={styles["newsheader"]}>
        {code}에 해당하는 뉴스
      </div>
      <div>
        <div>
          {currentItems.map((newsItem, index) => (
            <div className={styles["newsconstent"]} key={index}>
              <div className={styles["newsdate"]}>{newsItem.x}</div>
              <div className={styles["newstitle"]}><a
                  href={newsItem.y[3]}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(newsItem.y[3], '_blank', 'width=1000,height=600');
                  }}
                  style={{ textDecoration:'none', color: 'inherit' }}
                >
                  {newsItem.y[0]}
                </a></div>
              <div className={styles["newsurl"]}>
                {newsItem.y[3]}
              </div>
            </div>
          ))}
        </div>
        <div className={styles["pagebuttonbox"]}>
          {/* Pagination 컴포넌트 */}
          <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
