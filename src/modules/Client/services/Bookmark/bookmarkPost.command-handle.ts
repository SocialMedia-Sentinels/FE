/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import bookmarkService from './bookmark.service'

class BookmarkPostCommandHandler {
  private _queryClient
  private _bookmarkPostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._bookmarkPostMutation = useMutation({
      mutationFn: (body: { post_id: string }) => bookmarkService.bookmarkPost(body)
    })
  }

  handle = async (data: any, handleSuccess: any, handleError: any) => {
    await this._bookmarkPostMutation.mutate(data, {
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
    return this._bookmarkPostMutation.isLoading
  }
}

export { BookmarkPostCommandHandler }
