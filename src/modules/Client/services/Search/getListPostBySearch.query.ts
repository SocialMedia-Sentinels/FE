/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useQuerySearchConfig from '../../hooks/useQuerySearchConfig'
import searchService from './search.service'
import { SearchConfig } from '../../interfaces'
import { NewFeed } from '../../interfaces/Post'
import { toast } from 'react-toastify'

class GetListPostBySearchQuery {
  private _query
  private _querySearchConfig

  constructor() {
    this._querySearchConfig = useQuerySearchConfig()
    this._query = useQuery({
      queryKey: ['search', this._querySearchConfig],
      queryFn: () => searchService.search(this._querySearchConfig as SearchConfig),
      keepPreviousData: true,
      onError: (error: any) => {
        toast.error(error.message)
      }
    })
  }
  fetch() {
    return this._query.data?.data.result as NewFeed[]
  }
}
export { GetListPostBySearchQuery }
