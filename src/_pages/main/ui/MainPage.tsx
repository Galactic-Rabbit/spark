'use client'

import { useSession } from '@entities/session'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import s from './MainPage.module.css'

//аналогично странице профиля, в зависимости от пропсов, рисуем разные кнопочки
export const MainPage = () => {
  const { isAuthorized } = useSession()

  return (
    <div className={s.layout}>
      <Header />
      <div className={s.contentWrapper}>
        {isAuthorized && <Sidebar />}
        <main className={s.main}>
          <h1>Main Page</h1>
        </main>
      </div>
    </div>
  )
}
