import axios from 'axios';
import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from '@/utils/token';

export type Member = {
  id: string
  name: string
  profileImage: string
}

export type Comment = {
  id: string
  content: string
  hasAuthority: boolean
  isLiked: boolean
  likeCount: number
  memberDto: Member
}

// 댓글에 대한 모든 대댓글 조회
export async function getAllReplies(id: string) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/reply/${id}/reply-comment`,
   headers: addAccessTokenToHeaders(),
  })
}

// 대댓글 생성
export async function createReply(id: string, content: string){
  return await axios({
    method: 'post',
    url: `${BASE_URL}/reply/${id}/reply-comment`,
    headers: addAccessTokenToHeaders(),
    data: { content }
    })
}

// 대댓글 수정
export async function updateReply(commentId: string, content: string, replyId: string) {
  return await axios({
  method: 'patch',
  url: `${BASE_URL}/reply/${commentId}/reply-comment/${replyId}`,
  headers: addAccessTokenToHeaders(),
  data: { content }
  })
}

// 대댓글 삭제
export async function deleteReply(commentId: string, replyId: string) {
  return await axios({
  method: 'delete',
  url: `${BASE_URL}/reply/${commentId}/reply-comment/${replyId}`,
  headers: addAccessTokenToHeaders(),
  })
}

// 대댓글 좋아요
export async function likeReply(id: string) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/reply/reply-comment/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}

// 대댓글 좋아요 취소
export async function deleteLikeReply(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/reply/reply-comment/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}
