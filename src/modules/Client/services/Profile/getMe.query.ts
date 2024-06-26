/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import userService from '../user.service'
import { User } from '../../interfaces'
import { clearTokenFromLocalStorage } from 'src/modules/Authentication/utils'

class GetMeQuery {
  private _query
  constructor(isAuthenticated: boolean) {
    this._query = useQuery({
      queryKey: ['profile'],
      queryFn: () => userService.getMe(),
      enabled: isAuthenticated,
      onError: (error: any) => {
        if (error.response.status === 403) {
          clearTokenFromLocalStorage()
        }
      }
    })
  }
  fetch() {
    return this._query.data?.data.user as User
  }

  isLoading() {
    return this._query.isLoading
  }
}
export { GetMeQuery }
