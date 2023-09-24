import axios from 'axios';
import { BASE_URL } from '../util/url'

export type Note = {
  note: {
    id: string
    multipartFileList: string[] | undefined
    buyPrice: number | undefined
    content: string
    privacy: boolean
    stockId: string
    type: string | undefined
    title: string
    linkList: string[] | undefined
  }
}

// 노트 전체보기
export async function getPostsAll(id: string) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-all`
  }).then((res) => res)
}

// 노트 상세보기
export async function getPostDetail(id: string) {
   return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/${id}`
   }).then((res) => res)
}

// 노트 생성
export async function createPost({note: {
  stockId, 
  type,
  privacy, 
  multipartFileList, 
  buyPrice,
  title, 
  content, 
  linkList, }} : Note) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note`,
   data: { stockId, type, privacy, multipartFileList, buyPrice, title, content, linkList }
  }).then((res) => res)
}

// 노트 수정
export async function updatePost({note: {
  id,
  stockId, 
  type,
  privacy, 
  multipartFileList, 
  buyPrice,
  title, 
  content, 
  linkList, }} : Note) {
  return await axios({
   method: 'patch',
   url: `${BASE_URL}/review-note`,
   data: { id, stockId, type, privacy, multipartFileList, buyPrice, title, content, linkList }
  }).then((res) => res)
}

// 노트 좋아요
export async function likePost(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/review-note/${id}/like`,
  })
}