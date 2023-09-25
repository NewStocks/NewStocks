import axios from 'axios';

const BASE_URL = 'https://www.newstocks.kr/api'; // 기본 URL

// 종목 정보
export const fetchStockInfo = (code: string) => {
  return axios.get(`${BASE_URL}/stock/find-stock-info/${code}`);
};

// 차트 정보
export const fetchChartData = (code: string) => {
  return axios.get(`${BASE_URL}/stock/find-chart/${code}`);
};

// 뉴스 정보
export const fetchNewsData = (code: string) => {
  return axios.get(`${BASE_URL}/news/find/${code}`);
};
// 해외뉴스 정보
export const fetchValueNewsData = (code: string) => {
  return axios.get(`${BASE_URL}/value-chain-news/find/${code}`);
};
// 오답노트 정보
export const fetchReviewNoteData = () => {
  return axios.get(`${BASE_URL}/review-note/find-all`);
};