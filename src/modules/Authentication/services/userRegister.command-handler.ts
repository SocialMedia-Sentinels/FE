import { useMutation } from '@tanstack/react-query'
import { ClientRegisterType } from '../utils'
import authService from './auth.service'

class UserRegisterCommandHandler {
  private _registerMutation

  constructor() {
    this._registerMutation = useMutation({
      mutationFn: (body: ClientRegisterType) => authService.register(body)
    })
  }

  handle = (data: ClientRegisterType, handleSuccess: any, handleError: any) => {
    return this._registerMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }

  isLoading() {
    return this._registerMutation.isLoading
  }
}

export { UserRegisterCommandHandler }
