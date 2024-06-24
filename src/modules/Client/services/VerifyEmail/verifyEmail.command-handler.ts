/* eslint-disable @typescript-eslint/no-explicit-any */
import userService from '../user.service'

class VerifyEmailCommandHandler {
  handle = async (data: { email_verify_token: string }, handleSuccess: any, handleError: any) => {
    try {
      const response = await userService.verifyEmail(data)
      handleSuccess(response.data)
    } catch (error) {
      handleError(error)
    }
  }
}

export { VerifyEmailCommandHandler }
