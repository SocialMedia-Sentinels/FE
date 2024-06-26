/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import commentService from './comment.service'
import { updateCommentForm } from '../../interfaces'

class UpdateCommentCommandHandler {
  private _queryClient
  private _updateCommentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._updateCommentMutation = useMutation({
      mutationFn: ({ body, comment_id }: { body: updateCommentForm; comment_id: string }) =>
        commentService.updateComment(body, comment_id)
    })
  }

  handle = async (
    data: { body: updateCommentForm; comment_id: string },
    handleSuccess: any,
    handleError: any
  ) => {
    this._updateCommentMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
        this._queryClient.invalidateQueries({
          queryKey: ['comments']
        })
      },
      onError: (error) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._updateCommentMutation.isLoading
  }
}

export { UpdateCommentCommandHandler }
