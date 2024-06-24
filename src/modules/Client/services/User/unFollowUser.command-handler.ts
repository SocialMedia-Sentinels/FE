import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../user.service'

class UnFollowUserCommandHandler {
  private _queryClient
  private _unFollowUserMutation

  constructor(username: string) {
    this._queryClient = useQueryClient()
    this._unFollowUserMutation = useMutation({
      mutationFn: () => userService.unFollow(username)
    })
  }

  handle = async (data: any, handleSuccess: any, handleError: any) => {
    await this._unFollowUserMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['profile']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['user']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['following']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['follower']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['suggestion']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._unFollowUserMutation.isLoading
  }
}

export { UnFollowUserCommandHandler }
