/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import commentService from './comment.service'
import { Comment } from '../../interfaces'

class GetListCommentQuery {
  private _query

  constructor(post_id: string) {
    this._query = useQuery({
      queryKey: ['comments', post_id],
      queryFn: () => commentService.getListComment(post_id),
      staleTime: 3 * 60 * 1000,
      enabled: post_id !== undefined
    })
  }

  fetch() {
    return this._query.data?.data.result as Comment[]
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetListCommentQuery }
