'use client'

import { useSession } from '@entities/session'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import s from './MainPage.module.css'
import { useGetAllPosts } from '@entities/post'
import Image from 'next/image'
import { useState } from 'react'
import { Modal } from '@shared/ui/Modal'

//аналогично странице профиля, в зависимости от пропсов, рисуем разные кнопочки
export const MainPage = () => {
  const { isAuthorized } = useSession()
  const { data: posts } = useGetAllPosts(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openedPostId, setOpenedPostId] = useState<number | null>(null)
  const openedPost = posts?.items.find((p) => p.id === openedPostId)

  const handleOpenPost = (postId: number) => {
    setOpenedPostId(postId)
    setIsModalOpen(true)
  }

  if (isModalOpen && openedPost) {
    return (
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title="Email sent">
        <p>Большая карточка поста</p>
      </Modal>
    )
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
              const cover = post.images[0]

              return (
                <li key={post.id} onClick={() => handleOpenPost(post.id)}>
                  {cover && (
                    <Image src={cover.url} alt={post.description} width={200} height={200} />
                  )}
                  {post.description}
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    </div>
  )
}
