/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import likeService from './like.service'

class LikePostCommandHandler {
  private _queryClient
  private _likePostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._likePostMutation = useMutation({
      mutationFn: (body: { post_id: string }) => likeService.likePost(body)
    })
  }

  handle = async (data: any, handleSuccess: any, handleError: any) => {
    await this._likePostMutation.mutate(data, {
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
    return this._likePostMutation.isLoading
  }
}

export { LikePostCommandHandler }
