import http from 'src/modules/Share/utils/http'

const likeService = {
  likePost: (body: { post_id: string }) => http.post('/like', body),

  unLikePost: (post_id: string) => http.delete(`/like/post/${post_id}`)
}

export default likeService
