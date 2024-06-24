/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import postService from './post.service'
import { updatePostForm } from '../../interfaces/Post'

class UpdatePostCommandHandler {
  private _queryClient
  private _updatePostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._updatePostMutation = useMutation({
      mutationFn: ({ body, post_id }: { body: updatePostForm; post_id: string }) =>
        postService.updatePost(body, post_id)
    })
  }

  handle = async (
    data: { body: updatePostForm; post_id: string },
    handleSuccess: any,
    handleError: any
  ) => {
    await this._updatePostMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['newFeeds']
        })
        this._queryClient.invalidateQueries({
          queryKey: ['post-detail']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._updatePostMutation.isLoading
  }
}

export { UpdatePostCommandHandler }
