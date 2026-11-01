export type PostsPage = {
  totalCount: number
  pageSize: number
  items: Post[]
  totalUsers: number
}

export type PostImage = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

type PostOwner = {
  firstName: string | null
  lastName: string | null
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string | null
  images: PostImage[]
  createdAt: string
  updatedAt: string
  avatarOwner: string
  ownerId: number
  owner: PostOwner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string[]
}
