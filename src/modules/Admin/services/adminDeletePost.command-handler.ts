/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import adminService from './admin.service'

class AdminDeletePostCommandHandler {
  private _queryClient
  private _deletePostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deletePostMutation = useMutation({
      mutationFn: (post_id: string) => adminService.deletePost(post_id)
    })
  }

  handle = (post_id: string, handleSuccess: any, handleError: any) => {
    this._deletePostMutation.mutate(post_id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['posts']
        })
        handleSuccess()
      },
      onError: (error) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._deletePostMutation.isLoading
  }
}

export { AdminDeletePostCommandHandler }
