import axios from "axios";
import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from "@/utils/token";


// const BASE_URL = "http://localhost:8200";

export const getUserInfo = async (userId?: string) => {
  if (userId) {
    return axios.get(`${BASE_URL}/member/${userId}`, {
      headers: addAccessTokenToHeaders(),
    });
  } else {
    return axios.get(`${BASE_URL}/member`, {
      headers: addAccessTokenToHeaders(),
    });
  }
};

type editInfo = {
  name?: string;
  multipartFile?: File;
};

export const editUserInfo = async (editInfo: editInfo) => {
  const formData = new FormData();

  Object.entries(editInfo).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return axios.patch(`${BASE_URL}/member`, formData, {
    headers: addAccessTokenToHeaders({ "Content-Type": "multipart/form-data" }),
  });
};

export const deleteUser = async () => {
  return axios.delete(`${BASE_URL}/member`, {
    headers: addAccessTokenToHeaders()
  })
}

export const getFollowingInfo = async () => {
  return axios.get(`${BASE_URL}/follow/following`, { headers: addAccessTokenToHeaders()}); 
}

export const followUser = async (userId: number) => {
  return axios.post(`${BASE_URL}/follow/${userId}`, null, {
    headers: addAccessTokenToHeaders()
  })
}

export const unfollowUser = async (userId: number) => {
  return axios.delete(`${BASE_URL}/follow/${userId}`, {
    headers: addAccessTokenToHeaders()
  })
}

export const getFollowerList = async () => {
  return axios.get(`${BASE_URL}/follow/follower`, {
    headers: addAccessTokenToHeaders()
  })
}

export const getFollowingList = async () => {
  return axios.get(`${BASE_URL}/follow/following`, {
    headers: addAccessTokenToHeaders()
  })
}