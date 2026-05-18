import { branding } from '../../config/branding'
import { useAuth } from '../../auth/useAuth'
import Button from '../ui/Button'

const Topbar = ({ title }: { title: string }) => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{branding.institutionName}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-slate-600 sm:block">{user?.fullName}</span>
        <Button variant="secondary" onClick={() => void logout()}>
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Topbar
