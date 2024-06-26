/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import commentService from './comment.service'

class DeleteCommentCommandHandler {
  private _queryClient
  private _deletePostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._deletePostMutation = useMutation({
      mutationFn: (comment_id: string) => commentService.deleteComment(comment_id)
    })
  }

  handle = (comment_id: string, handleSuccess: any, handleError: any) => {
    this._deletePostMutation.mutate(comment_id, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['comments']
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

export { DeleteCommentCommandHandler }
