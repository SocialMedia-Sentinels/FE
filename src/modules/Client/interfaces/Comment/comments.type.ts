export interface CommentsResType {
  message: string
  result: Comment[]
}
export interface Comment {
  _id: string
  user: {
    _id: string
    username: string
    avatar: string
  }
  post_id: string
  content: string
  created_at: string
}
