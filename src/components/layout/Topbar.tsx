import { defaultBranding } from '../../config/branding'
import { useAuth } from '../../auth/AuthProvider'
import { Button } from '../ui/Button'

export const Topbar = () => {
  const { session, logout } = useAuth()
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <img src={defaultBranding.logoUrl} alt="brand logo" className="h-8" />
        <div>
          <p className="text-sm font-semibold">{defaultBranding.institutionName}</p>
          <p className="text-xs text-slate-500">{session?.user.fullName}</p>
        </div>
      </div>
      <Button className="bg-slate-600" onClick={() => void logout()}>Logout</Button>
    </header>
  )
}
