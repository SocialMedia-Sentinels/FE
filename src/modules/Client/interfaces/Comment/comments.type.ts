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
  parent_id: string
  content: string
  created_at: string
  comment_reply: CommentReply[]
}
export interface CommentReply {
  _id: string
  user: {
    _id: string
    username: string
    avatar: string
  }
  content: string
  created_at: string
}
export interface updateCommentForm {
  content: string
}
