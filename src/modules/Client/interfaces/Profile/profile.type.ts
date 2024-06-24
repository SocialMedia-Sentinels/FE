export interface User {
  _id: string
  username: string
  email: string
  date_of_birth: string
  created_at: string
  updated_at: string
  verify: number
  follower: string[]
  following: string[]
  bio: string
  location: string
  gender: boolean
  phone_number: string
  website: string
  avatar: string
  cover_photo: string
}
export interface ResUser {
  message: string
  result: User
  isFollowing: boolean
  isMe: boolean
}

export interface updateMeForm {
  username?: string
  bio?: string
  location?: string
  date_of_birth?: string
  website?: string
  avatar?: string
  cover_photo?: string
}
