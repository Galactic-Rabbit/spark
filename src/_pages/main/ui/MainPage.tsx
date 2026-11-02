'use client'

import { useSession } from '@entities/session'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import s from './MainPage.module.css'
import { useGetAllPosts } from '@entities/post'
import Image from 'next/image'
import { useState } from 'react'
import { ModalBase } from '@shared/ui/ModalBase'

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
          <ModalBase
            open={openedPostId !== null}
            onOpenChange={(open) => !open && setOpenedPostId(null)}
            srTitle="Post"
            withOutsideClose
          >
            <p>Большая карточка поста</p>
          </ModalBase>
        </main>
      </div>
    </div>
  )
}
