'use client'

import { useSession } from '@entities/session'
import { Sidebar } from '@widgets/sidebar'
import { Post } from '@entities/post'
import s from './MainPage.module.css'
import { MainWidget } from '@widgets/main-widget'

type Props = {
  initialPosts: Post[]
  totalUsers: number
  serverError?: string | null // <--- Добавили пропс
}

export const MainPage = ({ initialPosts, totalUsers, serverError }: Props) => {
  const { isAuthorized } = useSession()

  return (
    <div className={s.contentWrapper}>
      {isAuthorized && <Sidebar />}

      <main className={s.main}>
        {/* Передаем ошибку в виджет */}
        <MainWidget initialPosts={initialPosts} totalUsers={totalUsers} serverError={serverError} />
      </main>
    </div>
  )
}
