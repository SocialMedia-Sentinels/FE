export interface NewFeedsResType {
  message: string
  result: NewFeed[]
  total: number
}

export interface NewFeed {
  _id: string
  user_id: string
  type: number
  audience: number
  content: string
  parent_id: string | null
  post_parent: PostParent | null
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
    follower: string[]
    following: string[]
    bio: string
    location: string
    website: string
    avatar: string
    cover_photo: string
  }
  bookmarks: number
  isLike: boolean
  isBookmark: boolean
  likes: number
}

export interface Medias {
  type: number
  url: string
}

export interface Hashtags {
  _id: string
  name: string
  created_at: string
}

export interface PostParent {
  _id: string
  user_id: string
  type: number
  audience: number
  content: string
  parent_id: null
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
    follower: string[]
    following: string[]
    bio: string
    location: string
    website: string
    avatar: string
    cover_photo: string
  }
}
