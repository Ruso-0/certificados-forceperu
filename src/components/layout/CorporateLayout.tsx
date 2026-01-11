import { Outlet } from 'react-router-dom'
import { Header } from '../corporate/Header'
import { Footer } from '../corporate/Footer'

export function CorporateLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
