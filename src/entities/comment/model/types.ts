export type ImageSize = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string // ISO-8601
}

export type CommentAuthor = {
  id: number
  username: string
  avatars: ImageSize[]
}

export type Comment = {
  id: number
  postId: number
  from: CommentAuthor
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}
