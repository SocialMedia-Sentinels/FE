import { Hashtags, Medias, PostParent } from 'src/modules/Client/interfaces/Post'

export interface PostsResType {
  message: string
  result: Post[]
  likes: number
  comments: number
}
export interface Post {
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
    avatar: string
  }
  bookmarks: number
  likes: number
  share_count: number
}
