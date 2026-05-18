import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { walletApi } from '../../../api/walletApi'
import { useAuthStore } from '../../../auth/authStore'
import Badge from '../../../components/ui/Badge'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import LoadingState from '../../../components/ui/LoadingState'
import { formatCurrency } from '../../../utils/currency'
import { formatDateTime } from '../../../utils/dates'

export const StatementsPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const statementQuery = useQuery({ queryKey: ['mini-statement-page', userId], queryFn: () => walletApi.getMiniStatement(userId) })

  if (statementQuery.isLoading) {
    return <LoadingState message="Loading mini statement..." />
  }

  return (
    <Card title="Mini statement">
      <DataTable
        columns={[
          { key: 'date', header: 'Date/Time', render: (row) => formatDateTime(row.dateTime) },
          { key: 'ref', header: 'Reference', render: (row) => row.reference },
          { key: 'amount', header: 'Amount', render: (row) => formatCurrency(row.amount) },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <Badge label={row.status} tone={row.status === 'SUCCESSFUL' ? 'success' : row.status === 'PENDING' ? 'warning' : 'danger'} />,
          },
        ]}
        rows={statementQuery.data?.data ?? []}
      />
    </Card>
  )
}

export const TransactionsPage = () => {
  const userId = useAuthStore((state) => state.user?.id ?? 'cus-1')
  const txQuery = useQuery({ queryKey: ['transactions-page', userId], queryFn: () => walletApi.getTransactions(userId) })

  if (txQuery.isLoading) {
    return <LoadingState message="Loading transactions..." />
  }

  return (
    <Card title="Full transaction history">
      <DataTable
        columns={[
          { key: 'id', header: 'Transaction ID', render: (row) => row.id },
          { key: 'date', header: 'Date/Time', render: (row) => formatDateTime(row.dateTime) },
          { key: 'channel', header: 'Channel', render: (row) => row.channel },
          { key: 'amount', header: 'Amount', render: (row) => formatCurrency(row.amount) },
          { key: 'reference', header: 'Reference', render: (row) => row.reference },
          { key: 'narration', header: 'Narration', render: (row) => row.narration },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <Badge label={row.status} tone={row.status === 'SUCCESSFUL' ? 'success' : row.status === 'PENDING' ? 'warning' : 'danger'} />,
          },
          {
            key: 'receipt',
            header: 'Receipt',
            render: (row) => (
              <Link className="text-emerald-700" to={`/receipt/${row.id}`}>
                View
              </Link>
            ),
          },
        ]}
        rows={txQuery.data?.data ?? []}
      />
    </Card>
  )
}
