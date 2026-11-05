'use client'

import { Post, PostCard } from '@entities/post'
import { PostModal } from '@widgets/post-modal'
import { useState } from 'react'
import s from './PostList.module.css'

type Props = {
  posts: Post[] | undefined
}

export const PostList = ({ posts }: Props) => {
  const [openedPostId, setOpenedPostId] = useState<number | null>(null)

  const openedPost = posts?.find((p) => p.id === openedPostId)

  const handleOpenPost = (postId: number) => {
    setOpenedPostId(postId)
  }
  return (
    <div>
      <ul className={s.container}>
        {posts?.map((post) => {
          return <PostCard key={post.id} post={post} onOpen={handleOpenPost} />
        })}
      </ul>
      <PostModal openedPost={openedPost} onClose={() => setOpenedPostId(null)} />
    </div>
  )
}
