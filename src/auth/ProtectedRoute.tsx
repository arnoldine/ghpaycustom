import { Navigate } from 'react-router-dom'
import type { Role } from '../types/auth'
import type { AdminPermission } from './permissions'
import { hasPermission } from './permissions'
import { useAuth } from './AuthProvider'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: Role[]
  permission?: AdminPermission
  loginPath?: string
}

export const ProtectedRoute = ({ children, roles, permission, loginPath = '/login' }: ProtectedRouteProps) => {
  const { session } = useAuth()
  if (!session) return <Navigate to={loginPath} replace />
  if (roles && !roles.includes(session.user.role)) {
    return <Navigate to={session.user.role === 'CUSTOMER' ? '/dashboard' : '/admin/dashboard'} replace />
  }
  if (permission && !hasPermission(session.user.role, permission)) {
    return <Navigate to="/admin/dashboard" replace />
  }
  return <>{children}</>
}
