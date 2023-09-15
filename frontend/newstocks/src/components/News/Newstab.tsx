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

// ... (이전 코드 생략)

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
        url: `http://localhost:8080/stock/find-chart/${code}`,
      })
        .then((res) => {
          const newsItems: NewsItem[] = res.data.series[1].data;

          // 같은? 날짜별로 그룹화 하기
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

  // 현재 페이지에 해당하는 뉴스 아이템만 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.flatMap((group) => group.newsItems).slice(indexOfFirstItem, indexOfLastItem);

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
          {/* 페이지 이동 버튼 */}
          <button
            className={styles["pagebutton"]}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전 페이지
          </button>
          <button
            className={styles["pagebutton"]}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage}
          >
            다음 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
