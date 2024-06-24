import { useQuery } from '@tanstack/react-query'
import userService from '../user.service'
import { User } from '../../interfaces'

class GetUserDetailQuery {
  private _query

  constructor(username: string) {
    this._query = useQuery({
      queryKey: ['user', username],
      queryFn: () => userService.getProfile(username),
      staleTime: 3 * 60 * 1000,
      enabled: username !== undefined
    })
  }

  fetch() {
    return this._query.data?.data.result as User
  }
  isMe() {
    return this._query.data?.data.isMe as boolean
  }
  isFollowing() {
    return this._query.data?.data.isFollowing as boolean
  }
  isLoading() {
    return this._query.isLoading
  }
  getError() {
    return this._query.error as any
  }
}

export { GetUserDetailQuery }
