import axios from 'axios';
import { BASE_URL } from '../util/url'

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

// 노트의 모든 댓글 조회
export async function getComments(id: string) {
  return await axios({
   method: 'get',
   url: `${BASE_URL}/review-note/${id}/reply`
  }).then((res) => res)
}

// 댓글 작성
export async function createComment(id: string, content: string){
  await axios({
    method: 'post',
    url: `${BASE_URL}/review-note/${id}/reply`,
    data: { content }
    })
}

// 댓글 수정
export async function updateComment(id: string, content: string) {
  return await axios({
  method: 'patch',
  url: `${BASE_URL}/review-note/${id}/reply`,
  data: { content }
  }).then((res) => res)
}

// 댓글 삭제 -> 확인 필요
export async function deleteComment(id: string) {
  return await axios({
  method: 'delete',
  url: `${BASE_URL}/review-note/${id}/reply`,
  }).then((res) => res)
}

