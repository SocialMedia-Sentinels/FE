/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import bookmarkService from './bookmark.service'

class UnBookmarkPostCommandHandler {
  private _queryClient
  private _unBookmarkPostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._unBookmarkPostMutation = useMutation({
      mutationFn: (data: { post_id: string }) => bookmarkService.unBookmarkPost(data.post_id)
    })
  }

  handle = async (data: { post_id: string }, handleSuccess: any, handleError: any) => {
    await this._unBookmarkPostMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['post-detail', data.post_id]
        })
        this._queryClient.invalidateQueries({
          queryKey: ['book-mark']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._unBookmarkPostMutation.isLoading
  }
}

export { UnBookmarkPostCommandHandler }
