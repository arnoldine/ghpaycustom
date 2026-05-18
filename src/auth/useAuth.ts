import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import type { AuthUser } from '../types/auth'
import { useAuthStore } from './authStore'

export const useAuth = (): {
  user: AuthUser | null
  token: string | null
  failedLoginAttempts: number
  failedPinAttempts: number
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
} => {
  const navigate = useNavigate()
  const { token, user, setSession, clear, failedLoginAttempts, incrementFailedLogin, failedPinAttempts } = useAuthStore()

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    const response = await authApi.login(email, password)
    if (!response.success || !response.data) {
      incrementFailedLogin()
      return { success: false, message: response.message }
    }
    setSession(response.data)
    return { success: true, message: response.message }
  }

  const logout = async (): Promise<void> => {
    await authApi.logout()
    clear()
    navigate('/login')
  }

  return { user, token, failedLoginAttempts, failedPinAttempts, login, logout }
}

export const usePinAttempts = (): ((attempts: number) => void) => {
  const setFailedPinAttempts = useAuthStore((state) => state.setFailedPinAttempts)
  return setFailedPinAttempts
}
