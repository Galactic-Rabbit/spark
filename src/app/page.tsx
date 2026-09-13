import { Header } from '@/components/ui/Header'
import { Sidebar } from '@/components/ui/Sidebar'
import { MainPage } from '@/screens/MainPage'
import s from './page.module.css'

export default function Home() {
  const isAuthorized = false // Замените на реальную проверку из token/storage

  return (
    <div className={s.layout}>
      <Header />
      <div className={s.contentWrapper}>
        {isAuthorized && <Sidebar />}
        <main className={s.main}>
          <MainPage />
        </main>
      </div>
    </div>
  )
}
