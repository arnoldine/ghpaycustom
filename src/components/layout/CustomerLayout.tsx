import { Outlet } from 'react-router-dom'
import { customerNavigation } from '../../config/navigation'
import MobileNav from './MobileNav'
import Topbar from './Topbar'

const CustomerLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Topbar title="GhanaPay Customer" />
    <main className="mx-auto max-w-5xl p-4 pb-20">
      <Outlet />
    </main>
    <MobileNav items={customerNavigation} />
  </div>
)

export default CustomerLayout
