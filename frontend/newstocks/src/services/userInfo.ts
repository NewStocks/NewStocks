import axios from "axios";
// import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from "@/utils/token";

const BASE_URL = "http://localhost:8200";

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
