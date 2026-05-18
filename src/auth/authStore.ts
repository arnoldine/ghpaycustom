import { create } from 'zustand'
import { z } from 'zod'
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

const authSessionSchema = z.object({
  token: z.string().min(1),
  expiresAt: z.string().min(1),
  user: z.object({
    id: z.string().min(1),
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(5),
    role: z.enum(['CUSTOMER', 'ADMIN', 'OPERATIONS', 'COMPLIANCE', 'SUPPORT', 'AGENT_MANAGER', 'MERCHANT_MANAGER', 'AUDITOR']),
    customerId: z.string().optional(),
  }),
})

export const loadPersistedSession = () => {
  if (import.meta.env.VITE_DEMO_PERSIST !== 'true') return null
  const raw = localStorage.getItem(persistKey)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    const result = authSessionSchema.safeParse(parsed)
    if (!result.success) {
      console.warn('Persisted demo session failed schema validation', result.error.flatten())
      return null
    }
    return result.data as AuthSession
  } catch (error) {
    console.warn('Failed to parse persisted demo session', error)
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
