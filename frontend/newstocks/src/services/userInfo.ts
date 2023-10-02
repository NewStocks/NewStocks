import axios from 'axios';
import { BASE_URL } from '../utils/url'

// const BASE_URL = "http://localhost:8200"

export const getUserInfo = async (userId?: string) => {
  if (userId) {
    return axios.get(`${BASE_URL}/member/${userId}`)
  } else {
    return axios.get(`${BASE_URL}/member`)
  }
}