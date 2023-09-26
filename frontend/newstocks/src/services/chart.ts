import axios from 'axios';

const BASE_URL = 'https://www.newstocks.kr/api'; // 기본 URL

// 종목 정보
export async function fetchStockInfo (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/stock/find-stock-info/${code}`
    })
};

// 차트 정보
export async function fetchChartData (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/stock/find-chart/${code}`
    })
};

// 뉴스 정보
export async function fetchNewsData (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/news/find/${code}`
    })
};

// 해외뉴스 정보
export async function fetchValueNewsData (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/value-chain-news/find/${code}`
    })
};
// 모든 오답노트 정보
export async function fetchReviewNoteData () {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/find-all`
    })
};
// 나의 오답노트 정보
export async function fetchMyReviewNoteData () {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/find-my`
    })
};