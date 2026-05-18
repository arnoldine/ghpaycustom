import { Outlet } from 'react-router-dom'
import { adminNav } from '../../config/navigation'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export const AdminLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Topbar />
    <div className="flex">
      <Sidebar items={adminNav} />
      <main className="w-full space-y-4 p-4 pb-20">
        <Outlet />
      </main>
    </div>
    <MobileNav items={adminNav} />
  </div>
)
