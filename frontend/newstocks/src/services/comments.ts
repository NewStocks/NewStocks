import axios from 'axios';

const BASE_URL = 'http://localhost:8200'; // 기본 URL

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