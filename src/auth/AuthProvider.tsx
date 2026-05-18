import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuthStore } from './authStore'

export const SessionTimeoutWarning = () => {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const warningTimeout = window.setTimeout(() => setShowWarning(true), 1000 * 60 * 13)
    const reset = (): void => setShowWarning(false)
    window.addEventListener('click', reset)
    return () => {
      clearTimeout(warningTimeout)
      window.removeEventListener('click', reset)
    }
  }, [])

  if (!showWarning) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-800 shadow">
      Session timeout warning: your demo session may expire soon.
    </div>
  )
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const hydrate = useAuthStore((state) => state.hydrate)
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  const content = useMemo(
    () => (
      <>
        {children}
        {token ? <SessionTimeoutWarning /> : null}
      </>
    ),
    [children, token],
  )

  return <>{content}</>
}
