import axios from 'axios';
import { BASE_URL } from '../utils/url'

type Search = {
  keyword: string
}

// 인기노트 조회
export async function getHotPosts() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-hot`
  })
}

// 노트 키워드 검색
export async function getSearchPosts({ keyword }: Search) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-keyword/${keyword}`
  })
}