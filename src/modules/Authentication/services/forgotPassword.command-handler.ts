/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import authService from './auth.service'

class ForgotPasswordCommandHandler {
  private _forgotPasswordMutation

  constructor() {
    this._forgotPasswordMutation = useMutation({
      mutationFn: (body: { email: string }) => authService.forgotPassword(body)
    })
  }

  handle = (data: any, handleSuccess: any, handleError: any) => {
    return this._forgotPasswordMutation.mutate(
      {
        email: data.email
      },
      {
        onSuccess: () => {
          handleSuccess()
        },
        onError: (error: any) => {
          handleError(error)
        }
      }
    )
  }

  isLoading() {
    return this._forgotPasswordMutation.isLoading
  }
}

export { ForgotPasswordCommandHandler }
