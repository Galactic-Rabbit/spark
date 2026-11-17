'use client'

import { Sidebar } from '@widgets/sidebar'
import s from './layout.module.css'
import { useSession } from '@entities/session'
import { redirect } from 'next/navigation'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthorized } = useSession()
  if (!isAuthorized) {
    redirect('/login')
  }
  return (
    <div className={s.contentWrapper}>
      <Sidebar />
      <main className={s.main}>{children}</main>
    </div>
  )
}
