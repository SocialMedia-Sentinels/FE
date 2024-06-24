import http from 'src/modules/Share/utils/http'
import { PaginationConfig } from '../../interfaces'

const bookmarkService = {
  getBookMarkByUserId: (params: PaginationConfig) => http.get('/bookmarks', { params }),

  bookmarkPost: (body: { post_id: string }) => http.post('/bookmarks', body),

  unBookmarkPost: (post_id: string) => http.delete(`/bookmarks/post/${post_id}`)
}

export default bookmarkService
