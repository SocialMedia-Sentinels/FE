import http from 'src/modules/Share/utils/http'
import { CreateCommentTypeBody } from '../../utils/rules/formCreateComment.rules'
import { CommentsResType } from '../../interfaces'

const commentService = {
  getListComment: (post_id: string) =>
    http.get<CommentsResType>(`/comments/list_comment/${post_id}`),

  createComment: (body: CreateCommentTypeBody) => http.post('/comments', body)
}

export default commentService
