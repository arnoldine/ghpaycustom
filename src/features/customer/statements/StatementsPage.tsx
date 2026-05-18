import { useQuery } from '@tanstack/react-query'
import { walletApi } from '../../../api/walletApi'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { formatDateTime } from '../../../utils/dates'
import { formatGhs } from '../../../utils/currency'

export const StatementsPage = () => {
  const mini = useQuery({ queryKey: ['mini-statement-screen'], queryFn: walletApi.getMiniStatement })
  const full = useQuery({ queryKey: ['full-statement-screen'], queryFn: walletApi.getTransactions })

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="mb-3 text-xl font-semibold">Mini Statement</h1>
        <DataTable
          rows={mini.data?.data ?? []}
          columns={[
            { header: 'Date', render: (row) => formatDateTime(row.createdAt) },
            { header: 'Narration', render: (row) => row.narration },
            { header: 'Amount', render: (row) => formatGhs(row.amount) },
          ]}
        />
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Full Statement</h2>
        <DataTable
          rows={full.data?.data ?? []}
          columns={[
            { header: 'ID', render: (row) => row.id },
            { header: 'Channel', render: (row) => row.channel },
            { header: 'Status', render: (row) => row.status },
            { header: 'Amount', render: (row) => formatGhs(row.amount) },
          ]}
        />
      </Card>
    </div>
  )
}
