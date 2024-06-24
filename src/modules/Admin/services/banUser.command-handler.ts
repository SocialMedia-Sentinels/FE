import { useMutation, useQueryClient } from '@tanstack/react-query'
import adminService from './admin.service'

class BanUserCommandHandler {
  private _queryClient
  private _banUserMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._banUserMutation = useMutation({
      mutationFn: (body: { user_id: string }) => adminService.banUser(body)
    })
  }

  handle = (data: { user_id: string }, handleSuccess: any, handleError: any) => {
    this._banUserMutation.mutate(data, {
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
    return this._banUserMutation.isLoading
  }
}

export { BanUserCommandHandler }
