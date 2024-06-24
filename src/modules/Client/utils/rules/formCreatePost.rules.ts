/* eslint-disable @typescript-eslint/ban-types */
export type CreatePostTypeBody = {
  type: number
  audience: number
  content: string
  parent_id: string
  hashtags: string[]
  mentions: string[]
  medias: Object[]
}
