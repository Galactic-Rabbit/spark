'use client'

import { Sidebar } from '@widgets/sidebar'
import s from './layout.module.css'
import { useSession } from '@entities/session'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { isAuthorized } = useSession()

  return (
    <div className={s.contentWrapper}>
      {isAuthorized && <Sidebar />}
      <main className={s.main}>{children}</main>
    </div>
  )
}
