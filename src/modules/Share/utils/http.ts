/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance } from 'axios'
import { AuthResponse } from 'src/modules/Authentication/interfaces'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from 'src/modules/Authentication/utils'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { isAxiosUnauthorizedError } from './utils'
import authService from 'src/modules/Authentication/services/auth.service'
import connect from '../constants/connect'
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: connect.baseUrl,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/users/login' || url === '/users/register') {
          const data = response.data as AuthResponse
          this.accessToken = data.result.access_token
          this.refreshToken = data.result.refresh_token
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
        }
        return response
      },
      async (error: any) => {
        if (error.response && error.response.status === HttpStatusCode.Forbidden) {
        }
        if (
          error.response &&
          [HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
            error.response.status
          )
        ) {
          if (
            isAxiosUnauthorizedError(error) &&
            error.response.config.url !== '/users/refresh-token'
          ) {
            await this.handleRefreshToken()
            if (error.config) {
              return this.instance.request(error.config)
            }
          }
        }
        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    return authService
      .refreshToken({
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data.result
        setAccessTokenToLocalStorage(access_token)
        setRefreshTokenToLocalStorage(refresh_token)
        this.accessToken = access_token
        this.refreshToken = refresh_token
        return { access_token: access_token, refresh_token: refresh_token }
      })
  }
}
const http = new Http().instance

export default http
