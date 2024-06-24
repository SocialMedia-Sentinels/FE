import { useQuery } from '@tanstack/react-query'
import userService from '../user.service'
import { ResListFollowingType } from '../../interfaces'

class GetListFollowerQuery {
  private _query

  constructor(username: string) {
    this._query = useQuery({
      queryKey: ['follower', username],
      queryFn: () => userService.getListFollower(username),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data as ResListFollowingType
  }
}

export { GetListFollowerQuery }
