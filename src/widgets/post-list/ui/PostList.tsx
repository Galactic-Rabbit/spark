'use client'

import { Post, PostCard, PostThumbnail } from '@entities/post'
import { PostModal } from '@widgets/post-modal'
import { useState } from 'react'
import s from './PostList.module.css'

type Props = {
  posts: Post[] | undefined
  /** feed — карточки с описанием (главная), grid — квадратные превью (профиль) */
  view?: 'feed' | 'grid'
}

export const PostList = ({ posts, view = 'feed' }: Props) => {
  // У карточек одинаковые пропсы — выбираем компонент один раз, а не if в map
  const Card = view === 'grid' ? PostThumbnail : PostCard

  const [openedPostId, setOpenedPostId] = useState<number | null>(null)

  const openedPost = posts?.find((p) => p.id === openedPostId)

  const handleOpenPost = (postId: number) => {
    setOpenedPostId(postId)
  }

  return (
    <div>
      <ul className={s.container}>
        {posts?.map((post) => {
          return <Card key={post.id} post={post} onOpen={handleOpenPost} />
        })}
      </ul>
      <PostModal openedPost={openedPost} onClose={() => setOpenedPostId(null)} />
    </div>
  )
}
