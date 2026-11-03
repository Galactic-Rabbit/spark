'use client'

import { useSession } from '@entities/session'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import s from './MainPage.module.css'
import { PostCard, useGetAllPosts } from '@entities/post'
import { useState } from 'react'
import { PostModal } from '@widgets/post-modal'

//аналогично странице профиля, в зависимости от пропсов, рисуем разные кнопочки
export const MainPage = () => {
  const { isAuthorized } = useSession()
  const { data: posts } = useGetAllPosts(0)
  const [openedPostId, setOpenedPostId] = useState<number | null>(null)
  const openedPost = posts?.items.find((p) => p.id === openedPostId)

  const handleOpenPost = (postId: number) => {
    setOpenedPostId(postId)
  }

  return (
    <div className={s.layout}>
      <Header />
      <div className={s.contentWrapper}>
        {isAuthorized && <Sidebar />}
        <main className={s.main}>
          <h1>Main Page</h1>
          <ul>
            {posts?.items.map((post) => {
              return <PostCard key={post.id} post={post} onOpen={handleOpenPost} />
            })}
          </ul>

          <PostModal openedPost={openedPost} onClose={() => setOpenedPostId(null)} />
        </main>
      </div>
    </div>
  )
}
