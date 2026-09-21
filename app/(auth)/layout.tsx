import { Header } from '@/components/ui/Header'
import s from './layout.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  )
}
