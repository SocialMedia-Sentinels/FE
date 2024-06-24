import http from 'src/modules/Share/utils/http'
import { CreatePostTypeBody } from '../../utils'
import { NewFeedsConfig, NewFeedsResType } from '../../interfaces/Post'
import { PostDetailResType, updatePostForm } from '../../interfaces/Post/postDetail.type'
import { PaginationConfig } from '../../interfaces'

const postService = {
  createPost: (body: CreatePostTypeBody) => http.post('/post', body),

  getPostDetail: (post_id: string) => http.get<PostDetailResType>(`/post/post-detail/${post_id}`),

  updatePost: (body: updatePostForm, post_id: string) =>
    http.patch(`/post/post-detail/${post_id}`, body),

  getNewFeeds: (params: NewFeedsConfig) => http.get<NewFeedsResType>('/post', { params }),

  getUserPost: (username: string, params: PaginationConfig) =>
    http.get<NewFeedsResType>(`/post/user-post/${username}`, { params }),

  deletePost: (post_id: string) => http.delete(`/post/${post_id}`)
}

export default postService
