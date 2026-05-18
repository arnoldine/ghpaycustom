import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { walletApi } from '../../../api/walletApi'
import { useAuth } from '../../../auth/useAuth'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { LoadingState } from '../../../components/ui/LoadingState'
import { formatGhs } from '../../../utils/currency'
import { formatDateTime } from '../../../utils/dates'

export const TransactionsPage = () => {
  const { session } = useAuth()
  const customerId = session?.user.customerId ?? 'c1'
  const query = useQuery({
    queryKey: ['customer-transactions', customerId],
    queryFn: () => walletApi.getTransactions(customerId),
  })
  if (query.isLoading) return <LoadingState />
  return (
    <Card>
      <h1 className="mb-3 text-xl font-semibold">Full Transaction History</h1>
      <DataTable
        rows={query.data?.data ?? []}
        columns={[
          { header: 'Date/Time', render: (row) => formatDateTime(row.createdAt) },
          { header: 'Channel', render: (row) => row.channel },
          { header: 'Amount', render: (row) => formatGhs(row.amount) },
          {
            header: 'Status',
            render: (row) => (
              <Badge text={row.status} tone={row.status === 'SUCCESSFUL' ? 'green' : row.status === 'PENDING' ? 'amber' : 'red'} />
            ),
          },
          { header: 'Reference', render: (row) => row.reference },
          { header: 'Receipt', render: (row) => <Link className="text-brand-primary" to={`/receipt/${row.id}`}>View</Link> },
        ]}
      />
    </Card>
  )
}
