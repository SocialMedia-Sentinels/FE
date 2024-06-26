/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'
import { ChangePasswordType } from '../utils'
import authService from './auth.service'

class UserChangePasswordCommandHandler {
  private _changePasswordMutaion

  constructor() {
    this._changePasswordMutaion = useMutation({
      mutationFn: (body: ChangePasswordType) => authService.changePassword(body)
    })
  }

  handle = (data: ChangePasswordType, handleSuccess: any, handleError: any) => {
    return this._changePasswordMutaion.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._changePasswordMutaion.isLoading
  }
}

export { UserChangePasswordCommandHandler }
