import s from './layout.module.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className={s.main}>{children}</main>
    </div>
  )
}
