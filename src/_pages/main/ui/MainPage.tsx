'use client'

import { useSession } from '@entities/session'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import s from './MainPage.module.css'
import { useGetAllPosts } from '@entities/post'
import { PostList } from '@widgets/post-list'
import { useCallback } from 'react'

//аналогично странице профиля, в зависимости от пропсов, рисуем разные кнопочки
export const MainPage = () => {
  const { isAuthorized } = useSession()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllPosts()

  const posts = data?.pages.flatMap((page) => page.items)
  const handleLoadMore = useCallback(() => fetchNextPage(), [fetchNextPage])

  return (
    <div className={s.layout}>
      <Header />
      <div className={s.contentWrapper}>
        {isAuthorized && <Sidebar />}
        <main className={s.main}>
          <h1>Main Page</h1>
          <PostList
            posts={posts}
            hasMore={hasNextPage}
            isLoadingMore={isFetchingNextPage}
            onLoadMore={handleLoadMore}
          />
        </main>
      </div>
    </div>
  )
}
