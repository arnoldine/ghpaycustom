import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { mockServer } from '../../../api/mockServer'
import { walletApi } from '../../../api/walletApi'
import { useAuthStore } from '../../../auth/authStore'
import Badge from '../../../components/ui/Badge'
import Card from '../../../components/ui/Card'
import EmptyState from '../../../components/ui/EmptyState'
import LoadingState from '../../../components/ui/LoadingState'
import StatCard from '../../../components/ui/StatCard'
import { formatCurrency } from '../../../utils/currency'
import { formatDateTime } from '../../../utils/dates'

const quickActions = [
  { label: 'Send Money', path: '/transfers' },
  { label: 'Cash-In', path: '/cash-in' },
  { label: 'Cash-Out', path: '/cash-out' },
  { label: 'Pay GhQR', path: '/ghqr' },
  { label: 'Buy Airtime', path: '/airtime' },
  { label: 'Report Issue', path: '/complaints' },
]

const CustomerDashboardPage = () => {
  const user = useAuthStore((state) => state.user)
  const userId = user?.id ?? 'cus-1'

  const balanceQuery = useQuery({ queryKey: ['balance', userId], queryFn: () => walletApi.getBalance(userId) })
  const miniStatementQuery = useQuery({ queryKey: ['mini-statement', userId], queryFn: () => walletApi.getMiniStatement(userId) })
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: () => mockServer.getCustomerProfile() })
  const devicesQuery = useQuery({ queryKey: ['devices'], queryFn: () => mockServer.getDevices() })

  if (balanceQuery.isLoading || miniStatementQuery.isLoading || profileQuery.isLoading || devicesQuery.isLoading) {
    return <LoadingState message="Loading customer dashboard..." />
  }

  return (
    <div className="grid gap-4">
      <section className="grid gap-3 md:grid-cols-3">
        <StatCard label="Wallet balance" value={formatCurrency(balanceQuery.data?.data.availableBalance ?? 0)} />
        <StatCard label="KYC status" value={profileQuery.data?.data.kycStatus ?? 'NOT_STARTED'} />
        <StatCard
          label="Device status"
          value={devicesQuery.data?.data.some((device) => device.linked && device.current) ? 'Linked' : 'Not linked'}
        />
      </section>

      <Card title="KYC and Device Notice">
        <p className="text-sm text-slate-600">
          KYC consent and device linking consent are required for higher transaction limits. Keep your profile updated for compliance and monitoring.
        </p>
      </Card>

      <Card title="Quick actions">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-semibold hover:bg-slate-100">
              {action.label}
            </Link>
          ))}
        </div>
      </Card>

      <Card title="Recent transactions">
        {miniStatementQuery.data?.data.length ? (
          <div className="grid gap-2">
            {miniStatementQuery.data.data.map((transaction) => (
              <div key={transaction.id} className="flex flex-wrap items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{transaction.reference}</p>
                  <p className="text-xs text-slate-500">{transaction.narration} • {formatDateTime(transaction.dateTime)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(transaction.amount)}</p>
                  <Badge
                    label={transaction.status}
                    tone={transaction.status === 'SUCCESSFUL' ? 'success' : transaction.status === 'PENDING' ? 'warning' : 'danger'}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No recent transactions found." />
        )}
      </Card>

      <Card title="Service shortcuts">
        <div className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <Link className="rounded-lg border border-slate-200 p-3 hover:bg-slate-50" to="/wallet">Wallet Balance & Mini statement</Link>
          <Link className="rounded-lg border border-slate-200 p-3 hover:bg-slate-50" to="/transactions">Full transaction history</Link>
          <Link className="rounded-lg border border-slate-200 p-3 hover:bg-slate-50" to="/kyc">KYC update</Link>
          <Link className="rounded-lg border border-slate-200 p-3 hover:bg-slate-50" to="/devices">Device management</Link>
        </div>
      </Card>
    </div>
  )
}

export default CustomerDashboardPage
