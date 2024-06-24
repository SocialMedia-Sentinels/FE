import http from 'src/modules/Share/utils/http'
import { ListFollowingConfig, SuggestionsConfig, updateMeForm } from '../interfaces'

const userService = {
  getMe: () => http.get('/users/me'),

  updateMe: (body: updateMeForm) => http.patch('/users/me', body),

  getListMeFollowing: (params: ListFollowingConfig) => http.get('/users/me/following', { params }),

  verifyEmail: (body: { email_verify_token: string }) => http.post('/users/verify-email', body),

  resendVerifyEmail: () => http.post('/users/resend-verify-email'),

  getProfile: (username: string) => http.get(`/users/profile/${username}`),

  getListFollowing: (username: string) => http.get(`/users/profile/following/${username}`),

  getListFollower: (username: string) => http.get(`/users/profile/follower/${username}`),

  follow: (body: { followed_user_id: string }) => http.post('/users/follow', body),

  unFollow: (username: string) => http.delete(`/users/follow/${username}`),

  suggestion: (params: SuggestionsConfig) => http.get('/users/suggestion', { params }),

  chatUsers: () => http.get('/users/chat')
}

export default userService
