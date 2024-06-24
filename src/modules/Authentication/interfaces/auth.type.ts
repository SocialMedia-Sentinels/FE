export interface AuthResponse {
  message: string
  result: {
    access_token: string
    refresh_token: string
  }
}

export interface RefreshResponse {
  message: string
  result: {
    access_token: string
    refresh_token: string
  }
}

export interface ResetPasswordTokenConfig {
  token?: string
}
