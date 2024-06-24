/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateTicketTypeBody } from '../../utils'
import ticketService from './ticket.service'

class CreateTicketCommandHandler {
  private _queryClient
  private _createPostMutation

  constructor() {
    this._queryClient = useQueryClient()
    this._createPostMutation = useMutation({
      mutationFn: (body: CreateTicketTypeBody) => ticketService.createTicket(body)
    })
  }

  handle = async (data: CreateTicketTypeBody, handleSuccess: any, handleError: any) => {
    try {
      this._createPostMutation.mutate(data, {
        onSuccess: () => {
          this._queryClient.invalidateQueries({
            queryKey: ['tickets']
          })
          handleSuccess()
        },
        onError: (error: any) => {
          handleError(error)
        }
      })
    } catch (error) {
      handleError(error)
    }
  }

  isLoading() {
    return this._createPostMutation.isLoading
  }
}

export { CreateTicketCommandHandler }
