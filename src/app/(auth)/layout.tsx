import { Header } from '@/components/ui/Header'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
