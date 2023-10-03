import axios from 'axios';
import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from '@/utils/token';

type Search = {
  keyword: string
}

// 본인노트 조회
export async function getMyPosts() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-my`,
   headers: addAccessTokenToHeaders(),
  })
}

// 인기노트 조회
export async function getHotPosts() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-hot`,
   headers: addAccessTokenToHeaders(),
  })
}

// 내 피드 노트 조회
export async function getPheedPosts() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/pheed`,
   headers: addAccessTokenToHeaders(),
  })
}

// 노트 키워드 검색
export async function getSearchPosts({ keyword }: Search) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-keyword/${keyword}`,
   headers: addAccessTokenToHeaders(),
  })
}

export async function getScrappedPosts() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-scrapped`,
   headers: addAccessTokenToHeaders()
  })
}