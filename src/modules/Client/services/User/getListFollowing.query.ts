/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import userService from '../user.service'
import { ResListFollowingType } from '../../interfaces'

class GetListFollowingQuery {
  private _query

  constructor(username: string) {
    this._query = useQuery({
      queryKey: ['following', username],
      queryFn: () => userService.getListFollowing(username),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ResListFollowingType
  }
}

export { GetListFollowingQuery }
