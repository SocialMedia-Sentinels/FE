import { Hashtags, Medias } from '../Post'

export interface BookmarkResType {
  message: string
  result: Bookmark[]
  total: number
}

export interface Bookmark {
  _id: string
  user_id: string
  type: number
  audience: number
  content: string
  parent_id: string | null
  hashtags: Hashtags[]
  medias: Medias[]
  created_at: string
  updated_at: string
  user: {
    _id: string
    username: string
    email: string
    date_of_birth: string
    created_at: string
    updated_at: string
    verify: number
    bio: string
    location: string
    website: string
    avatar: string
    cover_photo: string
    role: number
  }
}
