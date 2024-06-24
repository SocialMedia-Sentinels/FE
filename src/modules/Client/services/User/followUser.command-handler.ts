/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../user.service'

class FollowUserCommandHandler {
  private _queryClient
  private _followUserMutation

  constructor(followed_user_id: string) {
    this._queryClient = useQueryClient()
    this._followUserMutation = useMutation({
      mutationFn: () => userService.follow({ followed_user_id })
    })
  }

  handle = async (data: any, handleSuccess: any, handleError: any) => {
    await this._followUserMutation.mutate(data, {
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
    return this._followUserMutation.isLoading
  }
}

export { FollowUserCommandHandler }
