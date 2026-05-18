import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../auth/AuthProvider'
import { SessionTimeoutWarning } from '../components/ui/SessionTimeoutWarning'

const client = new QueryClient()

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={client}>
    <AuthProvider>
      {children}
      <SessionTimeoutWarning />
    </AuthProvider>
  </QueryClientProvider>
)
