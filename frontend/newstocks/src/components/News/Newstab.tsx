'use client'
import { usePathname,useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './Newstab.module.css'
import { useRouter } from 'next/navigation';
import { LiaSortDownSolid } from "react-icons/lia";

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

type NewsFilterOptions = {
  sortBy: 'latest' | 'oldest';
  filterBy: 'all' | 'positive' | 'negative';
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

  const [filterOptions, setFilterOptions] = useState<NewsFilterOptions>({
    sortBy: 'latest',
    filterBy: 'all',
  });


  useEffect(() => {
    const fetchData = () => {
      fetchNewsData(code)
        .then((res) => {
          // const date = new Date(res.data[0].publishTime).getTime()
          const newsData: NewsItem[] = res.data;
          const sortedNewsData = newsData.slice().sort((a, b) => {
            if (filterOptions.sortBy === 'latest') {
              return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
            } else {
              return new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime();
            }
          });
          const filteredNewsData = sortedNewsData.filter((item) => {
            if (filterOptions.filterBy === 'all') {
              return true;
            } else if (filterOptions.filterBy === 'positive' && item.sentimentType === 'POSITIVE') {
              return true;
            } else if (filterOptions.filterBy === 'negative' && item.sentimentType === 'NEGATIVE') {
              return true;
            } else {
              return false;
            }
          });
          setNewsData(filteredNewsData)
          // setNewsData(newsData)
          const datenews: DateNewsItem[]=[]
					res.data.forEach((item:any) => {
            const itemdate = item.publishTime.split(' ')
            // console.log(itemdate)
						if (itemdate[0] == newsDate) {
							datenews.push(item)
						}
					});
          const sorteddateNewsData = datenews.slice().sort((a, b) => {
            if (filterOptions.sortBy === 'latest') {
              return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
            } else {
              return new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime();
            }
          });
          const filtereddateNewsData = sorteddateNewsData.filter((item) => {
            if (filterOptions.filterBy === 'all') {
              return true;
            } else if (filterOptions.filterBy === 'positive' && item.sentimentType === 'POSITIVE') {
              return true;
            } else if (filterOptions.filterBy === 'negative' && item.sentimentType === 'NEGATIVE') {
              return true;
            } else {
              return false;
            }
          });
					setdateNews(filtereddateNewsData)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();

  }, [code,newsDate, filterOptions]);

  const handleSortChange = (sortBy: NewsFilterOptions['sortBy']) => {
    setFilterOptions({ ...filterOptions, sortBy });
  };

  const handleFilterChange = (filterBy: NewsFilterOptions['filterBy']) => {
    setFilterOptions({ ...filterOptions, filterBy });
  };

  useEffect(() => {
    const fetchValueData = () => {
      fetchValueNewsData(code)
        .then((res) => {
          const valuenews: ValueNewsItem[]= res.data;
          setValuenews(valuenews)
          const datevaluenews: DateValueNewsItem[]=[]
          res.data.forEach((item:any) => {
            const itemdate = item.publishTime.split(' ')
            // console.log(itemdate)
						if (itemdate[0] == newsDate) {
							datevaluenews.push(item)
						}
					});
          setdateValuenews(datevaluenews)
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
              <div className={styles["datetab"]}>{newsDate}</div>
            </div>
          )} 
          
          <div className={styles["filter-controls"]}>
              <select className={`${styles["filter-option"]} ${styles["custom-select"]}`} value={filterOptions.sortBy} onChange={(e) => handleSortChange(e.target.value as NewsFilterOptions['sortBy'])}>
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
              <select className={`${styles["filter-option"]} ${styles["custom-select"]}`} value={filterOptions.filterBy} onChange={(e) => handleFilterChange(e.target.value as NewsFilterOptions['filterBy'])}>
                <option value="all">전체 보기</option>
                <option value="positive">긍정 뉴스</option>
                <option value="negative">부정 뉴스</option>
              </select>
            </div>
          
        </div>
        <div>
          {/* 국내뉴스 */}
          {selectedView === 'news' && newsData.length === 0 && (
            <div className={styles["no-news"]}>뉴스가 없습니다.</div>
          )}
          {selectedView === 'overseasNews' && valuenews.length === 0 && (
            <div className={styles["no-news"]}>뉴스가 없습니다.</div>
          )}
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
            <div className={styles["filter-controls"]}>
              <select className={`${styles["filter-option"]} ${styles["custom-select"]}`} value={filterOptions.sortBy} onChange={(e) => handleSortChange(e.target.value as NewsFilterOptions['sortBy'])}>
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
              <select className={`${styles["filter-option"]} ${styles["custom-select"]}`} value={filterOptions.filterBy} onChange={(e) => handleFilterChange(e.target.value as NewsFilterOptions['filterBy'])}>
                <option value="all">전체 보기</option>
                <option value="positive">긍정 뉴스</option>
                <option value="negative">부정 뉴스</option>
              </select>
            </div>
          </div>
          <div>
          {/* 국내뉴스 */}
          {selectedView === 'news' && newsData.length === 0 && (
            <div className={styles["no-news"]}>뉴스가 없습니다.</div>
          )}
          {selectedView === 'overseasNews' && valuenews.length === 0 && (
            <div className={styles["no-news"]}>뉴스가 없습니다.</div>
          )}
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
