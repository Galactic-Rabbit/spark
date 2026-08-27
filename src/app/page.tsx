import { Header } from '@/components/ui/Header'
import { Sidebar } from '@/components/ui/Sidebar'
import { MainPage } from '@/screens/MainPage'

export default function Home() {
  const isAuthorized = true

  return (
    <div>
      <Header />

      <div className="flex-1 flex">
        {isAuthorized && <Sidebar />}

        <main>
          <MainPage />
        </main>
      </div>
    </div>
  )
}
