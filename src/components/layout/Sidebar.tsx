import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../config/navigation'
import { useAuth } from '../../auth/AuthProvider'

export const Sidebar = ({ items }: { items: NavItem[] }) => {
  const { session } = useAuth()
  return (
    <aside className="hidden w-60 border-r bg-white p-3 md:block">
      <nav className="space-y-1">
        {items
          .filter((item) => session && item.roles.includes(session.user.role))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-brand-primary text-white' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  )
}
