import axios from 'axios';
//import { BASE_URL } from '../utils/url'

const BASE_URL = "http://localhost:8200"

export const getUserInfo = async () => {
  return axios.get(`${BASE_URL}/member`)
}