export interface UsersResType {
  message: string
  result: UserDetail[]
}
export interface UserDetail {
  _id: string
  username: string
  email: string
  avatar: string
  bio: string
  date_of_birth: string
  follower: string[]
  following: string[]
  verify: number
  posts: number
  tickets: number
  created_at: string
  phone_number: string
  location: string
  gender: boolean
}
