import axios from 'axios';
import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from '@/utils/token';

export type Note = {
  stockId: string
  multipartFileList: string[] | undefined
  content: string
  privacy: boolean
  type: string | undefined
  title: string
  linkList: string[] | undefined
  buyDate: any
  buyPrice: number | null
  buyQuantity: string | null
  sellDate: any
  sellPrice: number | null
  sellQuantity: string | null
}

export type Member = {
    id: string
    name: string
    profileImage: string
}

export type News = {
  newsDtoList: string[]
}

export type Reply = {
  replyResDtoList: string[]
}

export type ImageList = {
  id: string,
  url: string
}

export type Link = {
  reviewNoteLinkDtoList: string[]
}

export type Stock = {
    id: string
    name: string
}

export type Post = {
  buyDate: string | null
  buyPrice: string | null
  buyQuantity: string | null
  content: string 
  hasAuthority: boolean
  id: string
  isLiked: boolean
  isScrapped: boolean
  memberDto: Member
  newsDtoList: News[] | null
  privacy: boolean
  replyResDtoList: Reply
  reviewNoteImageDtoList: ImageList[] | null
  reviewNoteLinkDtoList: Link[] | null
  sellDate: string | null
  sellPrice: string | null
  sellQuantity: string | null
  settingDate: string
  stockDto: Stock
  title: string
  type: string
  scrapCount: number
  likeCount: number
  replyCount: number
}

// 노트 전체보기
export async function getPostsAll() {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/find-all`,
   headers: addAccessTokenToHeaders(),
  })
}

// 노트 상세보기
export async function getPostDetail(id: string) {
   return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/${id}`,
    headers: addAccessTokenToHeaders(),
   }).then((res) => res)
}

// 노트 생성
export async function createPost(formData: FormData) {
  return await axios({
   method: 'post',
   url: `${BASE_URL}/review-note`,
   headers: addAccessTokenToHeaders({ "Content-Type": "multipart/form-data" }),
   data: formData,
})}


// 노트 수정
export async function updatePost(formData: FormData) {
  return await axios({
   method: 'patch',
   url: `${BASE_URL}/review-note`,
   headers: addAccessTokenToHeaders({ "Content-Type": "multipart/form-data" }),
   data: formData,
  })
}

// 노트 삭제
export async function deletePost(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/review-note/${id}`,
    headers: addAccessTokenToHeaders(),
  })
}

// 노트 좋아요
export async function likePost(id: string) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/review-note/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}

// 노트 좋아요 취소
export async function deleteLikePost(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/review-note/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}

// 노트 스크랩
export async function scrapPost(id: string) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/review-note/${id}/scrap`,
    headers: addAccessTokenToHeaders(),
  })
}

// 노트 스크랩 취소
export async function deleteScrapPost(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/review-note/${id}/scrap`,
    headers: addAccessTokenToHeaders(),
  })
}
