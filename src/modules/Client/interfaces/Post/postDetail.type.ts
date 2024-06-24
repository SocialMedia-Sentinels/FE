import { NewFeed } from './newfeeds.type'

export interface PostDetailResType {
  message: string
  result: NewFeed[]
}
export interface updatePostForm {
  content?: string
  audience?: number
  hashtags?: string[]
}
