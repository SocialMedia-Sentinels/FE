/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import likeService from './like.service'

class UnLikePostCommandHandler {
  private _queryClient
  private _unlikePostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._unlikePostMutation = useMutation({
      mutationFn: (data: { post_id: string }) => likeService.unLikePost(data.post_id)
    })
  }

  handle = async (data: { post_id: string }, handleSuccess: any, handleError: any) => {
    await this._unlikePostMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['post-detail', data.post_id]
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._unlikePostMutation.isLoading
  }
}

export { UnLikePostCommandHandler }
