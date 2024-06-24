import { useQuery } from '@tanstack/react-query'
import { NewFeedsResType } from '../../interfaces/Post'
import postService from './post.service'
import { PaginationConfig } from '../../interfaces'

class GetNewFeedsQuery {
  private _query

  constructor(params: PaginationConfig) {
    this._query = useQuery({
      queryKey: ['new-feeds'],
      queryFn: () => postService.getNewFeeds(params),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as NewFeedsResType
  }
}

export { GetNewFeedsQuery }
