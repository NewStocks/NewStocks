import axios from 'axios';
import { BASE_URL } from '../utils/url'
import { addAccessTokenToHeaders } from '@/utils/token';

export type Member = {
  id: string
  name: string
  profileImage: string
  role: string
}

export type Comment = {
  id: string
  content: string
  hasAuthority: boolean
  isLiked: boolean
  likeCount: number
  memberDto: Member
}


// 노트의 모든 댓글 조회
export async function getComments(id: string) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/${id}/reply`,
   headers: addAccessTokenToHeaders(),
  }).then((res) => res)
}

// 댓글 작성
export async function createComment(id: string, content: string){
  return await axios({
    method: 'post',
    url: `${BASE_URL}/review-note/${id}/reply`,
    data: { content },
    headers: addAccessTokenToHeaders(),
    })
}

// 댓글 수정
export async function updateComment(PostId: string, content: string, commentId: string) {
  return await axios({
  method: 'patch',
  url: `${BASE_URL}/review-note/${PostId}/reply/${commentId}`,
  data: { content },
  headers: addAccessTokenToHeaders(),
  })
}

// 댓글 삭제 -> 확인 필요
export async function deleteComment(PostId: string, commentId: string) {
  return await axios({
  method: 'delete',
  url: `${BASE_URL}/review-note/${PostId}/reply/${commentId}`,
  headers: addAccessTokenToHeaders(),
  })
}

// 댓글 좋아요
export async function likeComment(id: string) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/review-note/reply/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}

// 댓글 좋아요 취소
export async function deleteLikeComment(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/review-note/reply/${id}/like`,
    headers: addAccessTokenToHeaders(),
  })
}

