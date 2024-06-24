export interface ResListFollowingType {
  message: string
  users: UserFollowingInfoType[]
  page: number
  limit: number
  total_page: number
}
export interface UserFollowingInfoType {
  _id: string
  username: string
  avatar: string
}

export interface ResListSuggestionType {
  message: string
  result: UserSuggestionInfoType[]
  total: number
}
export interface UserSuggestionInfoType {
  _id: string
  username: string
  email: string
  date_of_birth: string
  location: string
  follower: string[]
  following: string[]
  posts: number
  avatar: string
  bio: string
  cover_photo: string
  verify: number
}
