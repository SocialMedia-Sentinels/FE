import http from 'src/modules/Share/utils/http'
import {
  ChangePasswordType,
  ClientLoginType,
  ClientRegisterType,
  ResetPasswordType
} from '../utils'
import { AuthResponse, RefreshResponse } from '../interfaces'

const authService = {
  login: (body: ClientLoginType) => http.post<AuthResponse>('/users/login', body),

  register: (body: ClientRegisterType) => http.post('/users/register', body),

  refreshToken: (body: { refresh_token: string }) =>
    http.post<RefreshResponse>('/users/refresh-token', body),

  logout: (body: { refresh_token: string }) => http.post('/users/logout', body),

  changePassword: (body: ChangePasswordType) => http.put('/users/change-password', body),

  forgotPassword: (body: { email: string }) => http.post('/users/forgot-password', body),

  resetPassword: (body: ResetPasswordType) => http.post('/users/reset-password', body)
}
export default authService
