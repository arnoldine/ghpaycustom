import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { Role } from '../types/auth'
import { canAccessModule, type AdminModule } from './permissions'
import { useAuthStore } from './authStore'

interface ProtectedRouteProps {
  allowRoles: Role[]
  adminModule?: AdminModule
}

const ProtectedRoute = ({ allowRoles, adminModule }: ProtectedRouteProps) => {
  const { user, token } = useAuthStore()
  const location = useLocation()

  if (!token || !user) {
    return <Navigate to={location.pathname.startsWith('/admin') ? '/admin/login' : '/login'} replace />
  }

  if (!allowRoles.includes(user.role)) {
    return <Navigate to={user.role === 'CUSTOMER' ? '/dashboard' : '/admin/dashboard'} replace />
  }

  if (adminModule && !canAccessModule(user.role, adminModule)) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
