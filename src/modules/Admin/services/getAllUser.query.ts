import { useQuery } from '@tanstack/react-query'
import adminService from './admin.service'

class GetAllUserQuery {
  private _query

  constructor() {
    this._query = useQuery({
      queryKey: ['users'],
      queryFn: () => adminService.getAllUsers(),
      keepPreviousData: true,
      staleTime: 3 * 60 * 1000
    })
  }

  fetch() {
    return this._query.data?.data.result
  }
}

export { GetAllUserQuery }
