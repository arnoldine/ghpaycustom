import { create } from 'zustand'
import type { AuthSession } from '../types/auth'
import { appConfig } from '../config/appConfig'

interface AuthState {
  session: AuthSession | null
  warningVisible: boolean
  warningCountdown: number
  setSession: (session: AuthSession | null) => void
  setWarning: (visible: boolean, countdown?: number) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  warningVisible: false,
  warningCountdown: appConfig.sessionTimeoutWarningSeconds,
  setSession: (session) => set({ session }),
  setWarning: (warningVisible, warningCountdown = appConfig.sessionTimeoutWarningSeconds) =>
    set({ warningVisible, warningCountdown }),
}))

const persistKey = appConfig.demoPersistenceKey

export const loadPersistedSession = () => {
  if (import.meta.env.VITE_DEMO_PERSIST !== 'true') return null
  const raw = localStorage.getItem(persistKey)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export const persistSession = (session: AuthSession | null) => {
  if (import.meta.env.VITE_DEMO_PERSIST !== 'true') return
  if (!session) {
    localStorage.removeItem(persistKey)
    return
  }
  localStorage.setItem(persistKey, JSON.stringify(session))
}
