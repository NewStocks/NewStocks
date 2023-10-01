import { addAccessTokenToHeaders } from '@/utils/token';
import { BASE_URL } from '@/utils/url';
import axios from 'axios';

// 종목 정보
export async function fetchStockInfo (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/stock/find-stock-info/${code}`,
    headers: addAccessTokenToHeaders(),
    })
};

// 차트 정보
export async function fetchChartData (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/stock/find-chart/${code}`,
    headers: addAccessTokenToHeaders(),
    })
};

// 뉴스 정보
export async function fetchNewsData (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/news/find/${code}`,
    headers: addAccessTokenToHeaders(),
    })
};

// 해외뉴스 정보
export async function fetchValueNewsData (code: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/value-chain-news/find/${code}`,
    headers: addAccessTokenToHeaders(),
    })
};
// 모든 오답노트 정보
export async function fetchReviewNoteData () {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/find-all`,
    headers: addAccessTokenToHeaders(),
    })
};
// 나의 오답노트 정보
export async function fetchMyReviewNoteData () {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/find-my`,
    headers: addAccessTokenToHeaders(),
    })
};