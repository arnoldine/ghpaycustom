import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../config/navigation'

const Sidebar = ({ items }: { items: NavItem[] }) => (
  <aside className="hidden w-64 border-r border-slate-200 bg-white p-3 md:block">
    <nav className="grid gap-1 text-sm">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2 ${isActive ? 'bg-emerald-50 font-semibold text-emerald-800' : 'text-slate-700 hover:bg-slate-100'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)

export default Sidebar
