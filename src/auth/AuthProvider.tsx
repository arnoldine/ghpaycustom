import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { authApi } from '../api/authApi'
import { appConfig } from '../config/appConfig'
import type { LoginRequest } from '../types/auth'
import { loadPersistedSession, persistSession, useAuthStore } from './useAuth'

interface AuthContextValue {
  session: ReturnType<typeof useAuthStore.getState>['session']
  warningVisible: boolean
  warningCountdown: number
  login: (payload: LoginRequest) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  tickActivity: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, setSession, warningVisible, warningCountdown, setWarning } = useAuthStore()
  const lastActivityRef = useRef(Date.now())

  useEffect(() => {
    const persisted = loadPersistedSession()
    if (persisted) setSession(persisted)
  }, [setSession])

  useEffect(() => {
    const onActivity = () => {
      lastActivityRef.current = Date.now()
      if (warningVisible) setWarning(false)
    }
    window.addEventListener('click', onActivity)
    window.addEventListener('keydown', onActivity)
    return () => {
      window.removeEventListener('click', onActivity)
      window.removeEventListener('keydown', onActivity)
    }
  }, [warningVisible, setWarning])

  useEffect(() => {
    if (!session) return
    const interval = setInterval(async () => {
      const inactiveSeconds = Math.floor((Date.now() - lastActivityRef.current) / 1000)
      const warningStart = appConfig.sessionTimeoutSeconds - appConfig.sessionTimeoutWarningSeconds
      if (inactiveSeconds >= appConfig.sessionTimeoutSeconds) {
        await authApi.logout()
        setSession(null)
        persistSession(null)
        setWarning(false)
        return
      }
      if (inactiveSeconds >= warningStart) {
        setWarning(true, appConfig.sessionTimeoutSeconds - inactiveSeconds)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [session, setSession, setWarning])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      warningVisible,
      warningCountdown,
      login: async (payload) => {
        const response = await authApi.login(payload)
        if (response.success && response.data) {
          setSession(response.data)
          persistSession(response.data)
          lastActivityRef.current = Date.now()
        }
        return { success: response.success, message: response.message }
      },
      logout: async () => {
        await authApi.logout()
        setSession(null)
        persistSession(null)
      },
      tickActivity: () => {
        lastActivityRef.current = Date.now()
        setWarning(false)
      },
    }),
    [session, warningVisible, warningCountdown, setSession, setWarning],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
