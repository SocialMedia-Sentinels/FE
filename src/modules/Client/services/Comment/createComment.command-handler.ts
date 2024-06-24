import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateCommentTypeBody } from '../../utils/rules/formCreateComment.rules'
import commentService from './comment.service'

class CreateCommentCommandHandler {
  private _queryClient
  private _createCommentMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._createCommentMutation = useMutation({
      mutationFn: (body: CreateCommentTypeBody) => commentService.createComment(body)
    })
  }

  handle = (data: CreateCommentTypeBody, handleSuccess: any, handleError: any) => {
    this._createCommentMutation.mutate(data, {
      onSuccess: () => {
        this._queryClient.invalidateQueries({
          queryKey: ['comments']
        })
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { CreateCommentCommandHandler }