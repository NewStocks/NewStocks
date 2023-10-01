import axios from 'axios';
import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from '@/utils/token';

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
  reviewNoteImageDtoList: string[]
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
  newsDtoList: News
  privacy: boolean
  replyResDtoList: Reply
  reviewNoteImageDtoList: ImageList
  reviewNoteLinkDtoList: Link
  sellDate: string | null
  sellPrice: string | null
  sellQuantity: string | null
  settingDate: string
  stockDto: Stock
  title: string
  type: string
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
   data: { stockId, type, privacy, multipartFileList, buyPrice, title, content, linkList },
   headers: addAccessTokenToHeaders(),
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
   data: { id, stockId, type, privacy, multipartFileList, buyPrice, title, content, linkList },
   headers: addAccessTokenToHeaders(),
  }).then((res) => res)
}

// 노트 좋아요
export async function likePost(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/review-note/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}