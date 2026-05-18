import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { adminApi } from '../../../api/adminApi'
import { walletApi } from '../../../api/walletApi'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { EmptyState } from '../../../components/ui/EmptyState'
import { LoadingState } from '../../../components/ui/LoadingState'
import { StatCard } from '../../../components/ui/StatCard'
import { formatGhs } from '../../../utils/currency'
import { formatDateTime } from '../../../utils/dates'

const quickActions = [
  { label: 'Send Money', path: '/transfers' },
  { label: 'Cash-In', path: '/cash-in' },
  { label: 'Cash-Out', path: '/cash-out' },
  { label: 'Pay GhQR', path: '/ghqr' },
  { label: 'Buy Airtime', path: '/airtime' },
  { label: 'Report Issue', path: '/complaints' },
]

export const CustomerDashboardPage = () => {
  const balance = useQuery({ queryKey: ['balance'], queryFn: walletApi.getBalance })
  const mini = useQuery({ queryKey: ['mini-statement'], queryFn: walletApi.getMiniStatement })
  const devices = useQuery({ queryKey: ['devices'], queryFn: walletApi.getDevices })
  const customer = useQuery({ queryKey: ['customer-summary'], queryFn: () => adminApi.getCustomers('Kwame') })

  if (balance.isLoading || mini.isLoading || devices.isLoading || customer.isLoading) return <LoadingState />

  const currentCustomer = customer.data?.data[0]
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Wallet Balance" value={formatGhs(balance.data?.data.availableBalance ?? 0)} />
        <StatCard
          label="Linked Devices"
          value={String((devices.data?.data ?? []).filter((d) => d.linked).length)}
        />
      </div>

      <Card className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">KYC Status</p>
          <Badge text={currentCustomer?.kycStatus ?? 'NOT_STARTED'} tone={currentCustomer?.kycStatus === 'VERIFIED' ? 'green' : 'amber'} />
        </div>
        <Link to="/kyc" className="text-sm text-brand-primary">Update KYC</Link>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path} className="rounded-lg border p-3 text-sm hover:bg-slate-50">
              {action.label}
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">Recent Transactions</h2>
        {(mini.data?.data ?? []).length === 0 ? (
          <EmptyState message="No recent transactions" />
        ) : (
          <div className="space-y-2">
            {mini.data?.data.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded border p-2 text-sm">
                <div>
                  <p>{tx.narration}</p>
                  <p className="text-xs text-slate-500">{formatDateTime(tx.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatGhs(tx.amount)}</p>
                  <Badge text={tx.status} tone={tx.status === 'SUCCESSFUL' ? 'green' : tx.status === 'PENDING' ? 'amber' : 'red'} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
