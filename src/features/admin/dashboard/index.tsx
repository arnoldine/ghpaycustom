import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { adminApi } from '../../../api/adminApi'
import LoadingState from '../../../components/ui/LoadingState'
import StatCard from '../../../components/ui/StatCard'
import { formatCurrency } from '../../../utils/currency'

const AdminDashboardPage = () => {
  const statsQuery = useQuery({ queryKey: ['admin-dashboard'], queryFn: () => adminApi.getDashboardStats() })

  if (statsQuery.isLoading) {
    return <LoadingState message="Loading admin dashboard..." />
  }

  const stats = statsQuery.data?.data
  if (!stats) return <LoadingState message="No dashboard data" />

  return (
    <div className="grid gap-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="total wallets" value={stats.totalWallets.toLocaleString()} />
        <StatCard label="active wallets" value={stats.activeWallets.toLocaleString()} />
        <StatCard label="transaction value today" value={formatCurrency(stats.totalTransactionValueToday)} />
        <StatCard label="transaction count today" value={stats.transactionCountToday.toLocaleString()} />
        <StatCard label="failed transactions" value={stats.failedTransactions.toString()} />
        <StatCard label="pending reconciliations" value={stats.pendingReconciliations.toString()} />
        <StatCard label="open disputes" value={stats.openDisputes.toString()} />
        <StatCard label="suspicious alerts" value={stats.suspiciousAlerts.toString()} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-3">
          <h3 className="mb-2 text-sm font-semibold">Transaction volume by channel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.channelVolume} dataKey="value" nameKey="channel" fill="#006B3F" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-3">
          <h3 className="mb-2 text-sm font-semibold">Successful vs failed transactions</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.successFailedTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#006B3F" />
              <Bar dataKey="failed" fill="#CE1126" />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-3">
          <h3 className="mb-2 text-sm font-semibold">Wallet growth trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={stats.walletGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="wallets" stroke="#006B3F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </article>
      </section>
    </div>
  )
}

export default AdminDashboardPage
