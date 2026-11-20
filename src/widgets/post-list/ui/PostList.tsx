'use client'

import { Post, PostCard, PostThumbnail } from '@entities/post'
import { PostModal } from '@widgets/post-modal'
import { useState } from 'react'
import { useInfiniteScroll } from '@shared/lib/useInfiniteScroll'
import s from './PostList.module.css'

type Props = {
  posts: Post[] | undefined
  /** feed — карточки с описанием (главная), grid — квадратные превью (профиль) */
  view?: 'feed' | 'grid'
  /** есть ли следующая страница (бесконечный скролл) */
  hasMore?: boolean
  /** прямо сейчас грузится следующая страница */
  isLoadingMore?: boolean
  /** произошла ошибка при загрузке следующей страницы */
  isErrorLoadMore?: boolean // <--- 1. ДОБАВИЛИ В ТИП
  /** подгрузить следующую страницу */
  onLoadMore?: () => void
}

export const PostList = ({
  posts,
  view = 'feed',
  hasMore,
  isLoadingMore,
  isErrorLoadMore, // <--- 2. ДОСТАЛИ ИЗ ПРОПСОВ
  onLoadMore,
}: Props) => {
  // У карточек одинаковые пропсы — выбираем компонент один раз, а не if в map
  const Card = view === 'grid' ? PostThumbnail : PostCard

  const [openedPostId, setOpenedPostId] = useState<number | null>(null)

  const openedPost = posts?.find((p) => p.id === openedPostId)

  const handleOpenPost = (postId: number) => {
    setOpenedPostId(postId)
  }

  // Сентинел в конце списка: как только он вошёл в зону видимости (с запасом
  // rootMargin), просим следующую страницу. Механика — в useInfiniteScroll.
  // <--- 3. ПЕРЕДАЛИ isErrorLoadMore В ХУК
  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoadingMore,
    isErrorLoadMore,
    onLoadMore,
  })

  return (
    <div>
      <ul className={s.container}>
        {posts?.map((post) => {
          return <Card key={post.id} post={post} onOpen={handleOpenPost} />
        })}
      </ul>

      {/* Сентинел рендерим только если есть куда грузить */}
      {hasMore && <div ref={sentinelRef} className={s.sentinel} />}

      <PostModal openedPost={openedPost} onClose={() => setOpenedPostId(null)} />
    </div>
  )
}
