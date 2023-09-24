import axios from 'axios';
import { BASE_URL } from '../util/url'

export type Notice = {
  title: string
  content: string
  multipartFileList: string[] | undefined
}

export type updateNotice = {
  notice: Notice
  deletedImageList: string[]
}

// 공지 전체보기
export async function getNoticesAll() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/notice/find-all`
  }).then((res) => res)
}

// 공지 상세보기
export async function getNoticeDetail(id: string) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/notice/find-detail/${id}`
  }).then((res) => res)
}

// 공지 작성
export async function createNotice({ title, content, multipartFileList }: Notice) {
  return await axios({
  method: 'post',
  url: `${BASE_URL}/notice/insert`,
  data: { title, content, multipartFileList }
  }).then((res) => res)
}

// 공지 수정
export async function updateNotice({ notice: {title, content, multipartFileList}, deletedImageList}: updateNotice, id: string) {
  return await axios({
   method: 'patch',
   url: `${BASE_URL}/notice/update/${id}`,
   data: { title, content, multipartFileList, deletedImageList }
  }).then((res) => res)
}

// 공지 삭제
export async function deleteNotice(id: string) {
  return await axios({
   method: 'delete',
   url: `${BASE_URL}/notice/delete/${id}`,
  }).then((res) => res)
}