'use client'

import { Post, PostCard } from '@entities/post'
import { PostModal } from '@widgets/post-modal'
import { useState } from 'react'
import s from './PostList.module.css'

type Props = {
  posts: Post[] | undefined
  /** на что влияет show у PostCard: true — обрезка (главная), false — квадрат (профиль) */
  show?: boolean
}

export const PostList = ({ posts, show }: Props) => {
  const [openedPostId, setOpenedPostId] = useState<number | null>(null)

  const openedPost = posts?.find((p) => p.id === openedPostId)

  const handleOpenPost = (postId: number) => {
    setOpenedPostId(postId)
  }
  return (
    <div>
      <ul className={s.container}>
        {posts?.map((post) => {
          return <PostCard key={post.id} post={post} onOpen={handleOpenPost} show={show} />
        })}
      </ul>
      <PostModal openedPost={openedPost} onClose={() => setOpenedPostId(null)} />
    </div>
  )
}
