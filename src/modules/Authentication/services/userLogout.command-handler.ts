import { useMutation } from '@tanstack/react-query'
import authService from './auth.service'

class UserLogoutCommandHandler {
  private _logoutMutation

  constructor() {
    this._logoutMutation = useMutation({
      mutationFn: (body: { refresh_token: string }) => authService.logout(body)
    })
  }

  handle = (data: { refresh_token: string }, handleSuccess: any, handleError: any) => {
    return this._logoutMutation.mutate(data, {
      onSuccess: () => {
        handleSuccess()
      },
      onError: (error: any) => {
        handleError(error)
      }
    })
  }
}

export { UserLogoutCommandHandler }
