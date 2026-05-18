import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../config/navigation'
import { useAuth } from '../../auth/AuthProvider'

export const MobileNav = ({ items }: { items: NavItem[] }) => {
  const { session } = useAuth()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-4 gap-1 border-t bg-white p-2 md:hidden">
      {items
        .filter((item) => session && item.roles.includes(session.user.role))
        .slice(0, 8)
        .map((item) => (
          <NavLink key={item.path} to={item.path} className="rounded px-2 py-1 text-center text-xs text-slate-700">
            {item.label}
          </NavLink>
        ))}
    </nav>
  )
}
