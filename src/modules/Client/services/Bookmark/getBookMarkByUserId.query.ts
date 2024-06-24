import { useQuery } from '@tanstack/react-query'
import { Bookmark, PaginationConfig } from '../../interfaces'
import bookmarkService from './bookmark.service'
import useQueryPaginationListBookmarkConfig from '../../hooks/useQueryPaginationListBookmarkConfig'

class GetBookMarkByUserIdQuery {
  private _query
  private _queryPaginationConfig

  constructor() {
    this._queryPaginationConfig = useQueryPaginationListBookmarkConfig()
    this._query = useQuery({
      queryKey: ['book-mark', this._queryPaginationConfig],
      queryFn: () =>
        bookmarkService.getBookMarkByUserId(this._queryPaginationConfig as PaginationConfig),
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data.posts as Bookmark[]
  }

  isLoading() {
    return this._query.isLoading
  }
}

export { GetBookMarkByUserIdQuery }
