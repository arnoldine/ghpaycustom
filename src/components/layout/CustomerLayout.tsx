import { Outlet } from 'react-router-dom'
import { customerNav } from '../../config/navigation'
import { MobileNav } from './MobileNav'
import { Topbar } from './Topbar'

export const CustomerLayout = () => (
  <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
    <Topbar />
    <main className="mx-auto w-full max-w-4xl space-y-4 p-4">
      <Outlet />
    </main>
    <MobileNav items={customerNav} />
  </div>
)
