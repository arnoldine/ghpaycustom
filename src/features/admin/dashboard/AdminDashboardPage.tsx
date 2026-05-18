import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { adminApi } from '../../../api/adminApi'
import { Card } from '../../../components/ui/Card'
import { LoadingState } from '../../../components/ui/LoadingState'
import { StatCard } from '../../../components/ui/StatCard'
import { formatGhs } from '../../../utils/currency'

export const AdminDashboardPage = () => {
  const query = useQuery({ queryKey: ['admin-dashboard'], queryFn: adminApi.getDashboardStats })
  if (query.isLoading) return <LoadingState />
  const data = query.data?.data
  if (!data) return null

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Wallets" value={String(data.stats.totalWallets)} />
        <StatCard label="Active Wallets" value={String(data.stats.activeWallets)} />
        <StatCard label="Tx Value Today" value={formatGhs(data.stats.totalTransactionValueToday)} />
        <StatCard label="Tx Count Today" value={String(data.stats.transactionCountToday)} />
        <StatCard label="Failed Transactions" value={String(data.stats.failedTransactions)} />
        <StatCard label="Pending Reconciliations" value={String(data.stats.pendingReconciliations)} />
        <StatCard label="Open Disputes" value={String(data.stats.openDisputes)} />
        <StatCard label="Suspicious Alerts" value={String(data.stats.suspiciousAlerts)} />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="h-72">
          <h2 className="mb-2 text-sm font-semibold">Transaction Volume by Channel</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.volumeByChannel} dataKey="value" nameKey="name" outerRadius={90} fill="#0B7A75" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-72">
          <h2 className="mb-2 text-sm font-semibold">Successful vs Failed Transactions</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.successVsFailed}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#0B7A75" />
              <Bar dataKey="failed" fill="#E11D48" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="h-72">
          <h2 className="mb-2 text-sm font-semibold">Wallet Growth Trend</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.walletGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0B7A75" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
