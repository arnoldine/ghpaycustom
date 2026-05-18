import { createContext } from 'react'
import type { LoginRequest } from '../types/auth'
import type { useAuthStore } from './authStore'

export interface AuthContextValue {
  session: ReturnType<typeof useAuthStore.getState>['session']
  warningVisible: boolean
  warningCountdown: number
  login: (payload: LoginRequest) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  tickActivity: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
