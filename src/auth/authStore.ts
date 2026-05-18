import { create } from 'zustand'
import { appConfig } from '../config/appConfig'
import type { AuthSession, AuthUser } from '../types/auth'

interface AuthState {
  token: string | null
  user: AuthUser | null
  failedLoginAttempts: number
  failedPinAttempts: number
  setSession: (session: AuthSession | null) => void
  incrementFailedLogin: () => void
  setFailedPinAttempts: (attempts: number) => void
  clear: () => void
  hydrate: () => void
}

const AUTH_KEY = 'ghpaycustom-demo-auth'

const persistSession = (session: { token: string | null; user: AuthUser | null }): void => {
  if (!appConfig.demoPersistence) return
  if (!session.token || !session.user) {
    localStorage.removeItem(AUTH_KEY)
    return
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  failedLoginAttempts: 0,
  failedPinAttempts: 0,
  setSession: (session) =>
    set(() => {
      persistSession({ token: session?.token ?? null, user: session?.user ?? null })
      return {
        token: session?.token ?? null,
        user: session?.user ?? null,
      }
    }),
  incrementFailedLogin: () => set((state) => ({ failedLoginAttempts: state.failedLoginAttempts + 1 })),
  setFailedPinAttempts: (attempts) => set({ failedPinAttempts: attempts }),
  clear: () =>
    set(() => {
      persistSession({ token: null, user: null })
      return {
        token: null,
        user: null,
        failedLoginAttempts: 0,
        failedPinAttempts: 0,
      }
    }),
  hydrate: () => {
    if (!appConfig.demoPersistence) return
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as { token: string; user: AuthUser }
      set({ token: parsed.token, user: parsed.user })
    } catch {
      localStorage.removeItem(AUTH_KEY)
    }
  },
}))
