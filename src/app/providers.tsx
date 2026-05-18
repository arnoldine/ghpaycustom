import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AuthProvider } from '../auth/AuthProvider'
import { SessionTimeoutWarning } from '../components/ui/SessionTimeoutWarning'
import { defaultBranding } from '../config/branding'

const client = new QueryClient()

const BrandingBridge = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', defaultBranding.primaryColor)
    document.documentElement.style.setProperty('--brand-secondary', defaultBranding.secondaryColor)
  }, [])
  return <>{children}</>
}

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={client}>
    <BrandingBridge>
      <AuthProvider>
        {children}
        <SessionTimeoutWarning />
      </AuthProvider>
    </BrandingBridge>
  </QueryClientProvider>
)
