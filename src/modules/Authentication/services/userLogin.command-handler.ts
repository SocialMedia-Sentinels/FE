/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query'
import { ClientLoginType } from '../utils'
import authService from './auth.service'

class UserLoginCommandHandler {
  private _loginMutation

  constructor() {
    this._loginMutation = useMutation({
      mutationFn: (body: ClientLoginType) => authService.login(body)
    })
  }
  handle = (data: ClientLoginType, handleSuccess: any, handleError: any) => {
    return this._loginMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
  isLoading() {
    return this._loginMutation.isLoading
  }
}

export { UserLoginCommandHandler }
