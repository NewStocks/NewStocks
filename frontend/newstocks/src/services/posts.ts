import axios from 'axios';

const BASE_URL = 'http://localhost:8200'; // 기본 URL

export const postDetail = (id: sting) => {
   return axios.get(`${BASE_URL}/review-note/${id}`)
  .then((res) => res)
}