const path = {
  // Authen
  login: '/login',
  register: '/register',
  admin_login: '/admin/login',
  forget_password: '/forgetPassword',
  reset_password: '/reset-password/',
  landing: '/',
  // Client
  home: '/home',
  bookmarks: '/bookmarks',
  suggestions: '/suggestions',
  marketplace: '/marketplace',
  search: '/search',
  chat: '/chat',
  profile: '/profile',
  post_detail: '/post_detail/:post_id',
  verify_email: '/verify-email',
  user_profile: '/profile/:username',
  list_following: '/following',
  // Admin
  dashboard: '/admin/dashboard',
  users: '/admin/users',
  posts: '/admin/posts',
  ticket: '/admin/ticket'
} as const
export default path
