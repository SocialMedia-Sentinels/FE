import http from 'src/modules/Share/utils/http'
import { CreateCommentTypeBody } from '../../utils/rules/formCreateComment.rules'
import { CommentsResType, updateCommentForm } from '../../interfaces'

const commentService = {
  getListComment: (post_id: string) =>
    http.get<CommentsResType>(`/comments/list_comment/${post_id}`),

  createComment: (body: CreateCommentTypeBody) => http.post('/comments', body),

  deleteComment: (comment_id: string) => http.delete(`/comments/${comment_id}`),

  updateComment: (body: updateCommentForm, comment_id: string) =>
    http.patch(`/comments/${comment_id}`, body)
}

export default commentService
