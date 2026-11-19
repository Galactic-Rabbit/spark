'use client'
import { useSession } from '@entities/session'
import { Sidebar } from '@widgets/sidebar'
import { Post } from '@entities/post'
import s from './MainPage.module.css'
import { MainWidget } from '@widgets/main-widget'

type Props = {
  initialPosts: Post[]
  totalUsers: number
}

export const MainPage = ({ initialPosts, totalUsers }: Props) => {
  const { isAuthorized } = useSession()

  return (
    <div className={s.contentWrapper}>
      {isAuthorized && <Sidebar />}

      <main className={s.main}>
        {/* Вся логика ленты спрятана внутри виджета */}
        <MainWidget initialPosts={initialPosts} totalUsers={totalUsers} />
      </main>
    </div>
  )
}
