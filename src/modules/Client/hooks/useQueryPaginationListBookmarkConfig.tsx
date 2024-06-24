import { useQueryParams } from 'src/modules/Share/hooks'
import { PaginationConfig } from '../interfaces'
import { isUndefined, omitBy } from 'lodash'

export type QueryPaginationConfig = {
  [key in keyof PaginationConfig]: string
}
const useQueryPaginationListBookmarkConfig = () => {
  const queryParams: QueryPaginationConfig = useQueryParams()
  const queryConfig: QueryPaginationConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || 5
    },
    isUndefined
  )
  return queryConfig
}

export default useQueryPaginationListBookmarkConfig
