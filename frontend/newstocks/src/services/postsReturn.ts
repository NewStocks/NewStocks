import axios from 'axios';
import { BASE_URL } from '../utils/url'

import { getHotPosts } from './sortedPosts'

export async function getHotPostsList() {
  const posts = await getHotPosts();
  console.log('posts', posts)
  return posts
}