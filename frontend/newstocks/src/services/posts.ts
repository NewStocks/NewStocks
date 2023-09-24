import axios from 'axios';

const BASE_URL = 'http://localhost:8200'; // 기본 URL

// 게시물 상세보기기
export async function postDetail(id: string) {
   return await axios.get(`${BASE_URL}/review-note/${id}`)
  .then((res) => res)
}