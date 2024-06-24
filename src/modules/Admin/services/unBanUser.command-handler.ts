import { useMutation, useQueryClient } from '@tanstack/react-query'
import adminService from './admin.service'

class UnBanUserCommandHandler {
  private _queryClient
  private _unBanUserMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._unBanUserMutation = useMutation({
      mutationFn: (body: { user_id: string }) => adminService.unBanUser(body)
    })
  }

  handle = (data: { user_id: string }, handleSuccess: any, handleError: any) => {
    this._unBanUserMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['users']
        })
        handleSuccess()
      },
      onError: (error) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._unBanUserMutation.isLoading
  }
}

export { UnBanUserCommandHandler }
