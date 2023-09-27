import axios from 'axios';
import { BASE_URL } from '../utils/url'

export const getAllStocks = async () => {
  return axios.get(`${BASE_URL}/stock/find-all-stock-for-search`)
}