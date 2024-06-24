/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import authService from './auth.service'
import { ResetPasswordType } from '../utils'

class ResetPasswordCommandHandler {
  private _resetPasswordMutation

  constructor() {
    this._resetPasswordMutation = useMutation({
      mutationFn: (body: ResetPasswordType) => authService.resetPassword(body)
    })
  }

  handle = (data: any, handleSuccess: any, handleError: any) => {
    return this._resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._resetPasswordMutation.isLoading
  }
}

export { ResetPasswordCommandHandler }
