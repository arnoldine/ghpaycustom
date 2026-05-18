import { Outlet } from 'react-router-dom'
import { adminNavigation } from '../../config/navigation'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const AdminLayout = () => (
  <div className="min-h-screen bg-slate-50 md:flex">
    <Sidebar items={adminNavigation} />
    <div className="flex-1">
      <Topbar title="GhanaPay Admin Portal" />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  </div>
)

export default AdminLayout
