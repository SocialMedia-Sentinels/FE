import { useQuery } from '@tanstack/react-query'
import postService from './post.service'
import { NewFeed } from '../../interfaces/Post'

class GetPostDetailQuery {
  private _query

  constructor(post_id: string) {
    this._query = useQuery({
      queryKey: ['post-detail', post_id],
      queryFn: () => postService.getPostDetail(post_id),
      staleTime: 3 * 60 * 1000,
      enabled: post_id !== undefined
    })
  }

  fetch() {
    if (this._query.isError) {
      return null
    }
    return this._query.data?.data.result as NewFeed[]
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetPostDetailQuery }
