import { Header } from '@/components/ui/Header'
import { Sidebar } from '@/components/ui/Sidebar'
import s from './layout.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.layout}>
      <Header />
      <div className={s.contentWrapper}>
        <Sidebar />
        <main className={s.main}>{children}</main>
      </div>
    </div>
  )
}
