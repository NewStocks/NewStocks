import axios from 'axios';
import { BASE_URL } from '../utils/url'

import { getMyPosts, getPheedPosts, getHotPosts, getSearchPosts } from './sortedPosts'

export async function getMyPostsList() {
  const posts = await getMyPosts();
  // console.log('myposts', posts)
  return posts
}

export async function getHotPostsList() {
  const posts = await getHotPosts();
  // console.log('posts', posts)
  return posts
}