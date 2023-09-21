'use client'
import { usePathname,useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './Newstab.module.css'
import { useRouter } from 'next/navigation';

import { fetchNewsData, fetchValueNewsData } from '@/services/chart';

type NewsItem = {
  company: any
  publishTime: string
  stockId: string
  title: string
  url: string
  sentimentType: string
};
type DateNewsItem = {
  company: any
  publishTime: string
  stockId: string
  title: string
  url: string
  sentimentType: string
};
type ValueNewsItem = {
  company: any
  publishTime: string
  stockId: string
  title: string
  url: string
  valueChainName: string
};
type DateValueNewsItem = {
  company: any
  publishTime: string
  stockId: string
  title: string
  url: string
  valueChainName: string
};

type GroupedNewsData = {
  date: string;
  newsItems: NewsItem[];
  datenewsItems: DateNewsItem[];
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
  const [selectedView, setSelectedView] = useState('news'); 

  const handleShowAllNews = () => {
    // 현재 URL에서 &date 파라미터 제거
    const currentUrl = window.location.href;
    const updatedUrl = currentUrl.replace(/&newsdate=[^&]*/, '');
    
    // 제거된 URL로 이동
    // window.location.href = updatedUrl;
    router.push(updatedUrl)
  };

  const router = useRouter();
  const tabName = usePathname() || '';
  const code = tabName.split('/').filter(Boolean)[0];
  const newsDate = useSearchParams()?.get('newsdate')
	// console.log(newsDate)
  
	const [datenews, setdateNews] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [valuenews, setValuenews] = useState<any[]>([]);
  const [datevaluenews, setdateValuenews] = useState<any[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState(5); // 페이지당 뉴스 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지


  useEffect(() => {
    const fetchData = () => {
      fetchNewsData(code)
        .then((res) => {
          // const date = new Date(res.data[0].publishTime).getTime()
          const newsData: NewsItem[] = res.data;
          setNewsData(newsData)
          console.log(newsData)
          const datenews: DateNewsItem[]=[]
					res.data.forEach((item:any) => {
            const itemdate = item.publishTime.split(' ')
            // console.log(itemdate)
						if (itemdate[0] == newsDate) {
							datenews.push(item)
						}
					});
					setdateNews(datenews)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();

  }, [code,newsDate]);

  useEffect(() => {
    const fetchValueData = () => {
      fetchValueNewsData(code)
        .then((res) => {
          console.log(res.data)
          const valuenews: ValueNewsItem[]= res.data;
          setValuenews(valuenews)
          console.log(valuenews)
          const datevaluenews: DateValueNewsItem[]=[]
          res.data.forEach((item:any) => {
            const itemdate = item.publishTime.split(' ')
            // console.log(itemdate)
						if (itemdate[0] == newsDate) {
							datevaluenews.push(item)
						}
					});
          setdateValuenews(datevaluenews)
          console.log()
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchValueData();

  }, [code,newsDate]);


  // 전체 뉴스일떄
    // 현재 페이지에 해당하는 뉴스 아이템만 추출
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

    // 전체 페이지 수 계산
    const totalPageCount = Math.ceil(newsData.length / itemsPerPage);

    // 페이지 변경 처리 함수
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    //세부날짜 뉴스일때
    const date_indexOfLastItem = currentPage * itemsPerPage;
    const date_indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const date_currentItems = datenews.slice(indexOfFirstItem, indexOfLastItem);
    const date_totalPageCount = Math.ceil(datenews.length / itemsPerPage);

  //해외 뉴스
  const valuecurrentItems = valuenews.slice(indexOfFirstItem, indexOfLastItem);
  const valuetotalPageCount = Math.ceil(valuenews.length / itemsPerPage);
  const date_valuecurrentItems = datevaluenews.slice(indexOfFirstItem, indexOfLastItem);
  const date_valuetotalPageCount = Math.ceil(datevaluenews.length / itemsPerPage);




  const date_handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles["newsmain"]}>
      {/* 세부날짜 눌렀을때 */}
      {newsDate && 
      <div>
        <div className={styles["newsheader"]}>
          {valuenews && (
            <div className={styles["globalheader"]}>
              <div
                className={`${styles["headertab"]} ${
                  selectedView === "news" ? styles["activeTab"] : ""}`}
                onClick={() => setSelectedView("news")}>국내 뉴스
              </div>
              <div
                className={`${styles["headertab"]} ${
                  selectedView === "overseasNews" ? styles["activeTab"] : ""}`}
                onClick={() => setSelectedView("overseasNews")}>해외 뉴스
              </div>
              <div 
                className={styles["headertab"]}
                onClick={handleShowAllNews}>전체 보기
              </div>
            </div>
          )} 
          <div className={styles["headertab"]}>{newsDate}</div>
        </div>
        <div>
          {/* 국내뉴스 */}
          {selectedView === 'news' && (
              date_currentItems.map((newsItem, index) => (
                <div
                  className={styles["newscontent"]}
                  key={index}
                  style={{
                    borderLeft: 
                    newsItem.sentimentType === 'POSITIVE' ? '10px solid rgba(79, 231, 176, 1)' : newsItem.sentimentType === 'NEGATIVE' ? '10px solid rgba(255, 66, 66, 1)' : '10px solid rgba(0, 5, 30, 0.7)',
                  }}
                >
                <div className={styles["newscontentup"]}>
                  <div className={styles["newscompany"]}>
                    {newsItem.company}
                  </div>
                  <div className={styles["newsdate"]}>{newsItem.publishTime}</div>
                </div>
                <div className={styles["newstitle"]}>
                  <a
                    href={newsItem.url}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(newsItem.url, '_blank', 'width=1000,height=600');
                    }}
                    style={{ textDecoration:'none', color: 'inherit' }}>
                    {newsItem.title}
                  </a>
                </div>
              </div>
              ))
            )
          }
          {/* 해외뉴스 */}
          {selectedView === 'overseasNews' && (
              date_valuecurrentItems.map((newsItem, index) => (
                <div className={styles["newscontent"]} key={index}>
                  <div className={styles["newscontentup"]}>
                    <div className={styles["newscompany"]}>
                      {newsItem.company}
                    </div>
                    <div className={styles["newsdate"]}>{newsItem.publishTime}</div>
                  </div>
                  <div className={styles["newstitle"]}>
                    <a
                      href={newsItem.url}
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(newsItem.url, '_blank', 'width=1000,height=600');
                      }}
                      style={{ textDecoration:'none', color: 'inherit' }}>
                      {newsItem.title}
                    </a>
                  </div>
              </div>
              ))
            )}
        </div>
        {selectedView === 'news' && 
          <div className={styles["pagebuttonbox"]}>
            <Pagination currentPage={currentPage} totalPageCount={date_totalPageCount} onPageChange={date_handlePageChange} />
          </div>
        }
        {selectedView === 'overseasNews' && 
          <div className={styles["pagebuttonbox"]}>
            <Pagination currentPage={currentPage} totalPageCount={date_valuetotalPageCount} onPageChange={date_handlePageChange} />
          </div>
        }
      </div>
      }
      {/* 전체 날짜 */}
      {!newsDate && 
      <div>
        <div className={styles["newsheader"]}>
          {valuenews && (
            <div className={styles["globalheader"]}>
              <div
                className={`${styles["headertab"]} ${
                  selectedView === "news" ? styles["activeTab"] : ""}`}
                onClick={() => setSelectedView("news")}>국내 뉴스
              </div>
              <div
                className={`${styles["headertab"]} ${
                  selectedView === "overseasNews" ? styles["activeTab"] : ""}`}
                onClick={() => setSelectedView("overseasNews")}>해외 뉴스
              </div>
            </div>
          )}
        </div>
        <div>
        {/* 국내뉴스 */}
        {selectedView === 'news' && (
            currentItems.map((newsItem, index) => (
              <div
                className={styles["newscontent"]}
                key={index}
                style={{
                  borderLeft: 
                  newsItem.sentimentType === 'POSITIVE' ? '10px solid rgba(79, 231, 176, 1)' : newsItem.sentimentType === 'NEGATIVE' ? '10px solid rgba(255, 66, 66, 1)' : '10px solid rgba(0, 5, 30, 0.7)',
                }}>
                <div className={styles["newscontentup"]}>
                  <div className={styles["newscompany"]}>
                    {newsItem.company}
                  </div>
                  <div className={styles["newsdate"]}>{newsItem.publishTime}</div>
                </div>
                <div className={styles["newstitle"]}>
                  <a
                    href={newsItem.url}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(newsItem.url, '_blank', 'width=1000,height=600');
                    }}
                    style={{ textDecoration:'none', color: 'inherit' }}>
                    {newsItem.title}
                  </a>
                </div>
              </div>
            ))
        )}
        {/* 해외뉴스 */}
        {selectedView === 'overseasNews' && (
          valuecurrentItems.map((newsItem, index) => (
            <div className={styles["newscontent"]} key={index}>
              <div className={styles["newscontentup"]}>
                  <div className={styles["newscompany"]}>
                    {newsItem.company}
                  </div>
                  <div className={styles["newsdate"]}>{newsItem.publishTime}</div>
                </div>
                <div className={styles["newstitle"]}>
                  <a
                    href={newsItem.url}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(newsItem.url, '_blank', 'width=1000,height=600');
                    }}
                    style={{ textDecoration:'none', color: 'inherit' }}>
                    {newsItem.title}
                  </a>
                </div>
            </div>
          ))
          )}
        </div>
        {selectedView === 'news' && 
          <div className={styles["pagebuttonbox"]}>
            <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={handlePageChange} />
          </div>
        }
        {selectedView === 'overseasNews' && 
          <div className={styles["pagebuttonbox"]}>
            <Pagination currentPage={currentPage} totalPageCount={valuetotalPageCount} onPageChange={handlePageChange} />
          </div>
        }
      </div>
      }
    </div>
  );
}
