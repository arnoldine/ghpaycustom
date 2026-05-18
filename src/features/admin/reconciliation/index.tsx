import { useMutation, useQuery } from '@tanstack/react-query'
import { reconciliationApi } from '../../../api/reconciliationApi'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import LoadingState from '../../../components/ui/LoadingState'
import StatCard from '../../../components/ui/StatCard'
import { formatCurrency } from '../../../utils/currency'

const downloadMockCsv = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const ReconciliationPage = () => {
  const query = useQuery({ queryKey: ['reconciliation'], queryFn: () => reconciliationApi.getReconciliation() })
  const mutation = useMutation({ mutationFn: reconciliationApi.runReconciliation })

  const view = mutation.data?.data ?? query.data?.data

  if (query.isLoading) {
    return <LoadingState message="Loading reconciliation..." />
  }

  return (
    <div className="grid gap-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Matched" value={(view?.overview.matched ?? 0).toString()} />
        <StatCard label="Unmatched" value={(view?.overview.unmatched ?? 0).toString()} />
        <StatCard label="Pending" value={(view?.overview.pending ?? 0).toString()} />
        <StatCard label="Exceptions" value={(view?.overview.exceptions ?? 0).toString()} />
      </section>
      <Card title="Reconciliation Controls">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => mutation.mutate()}>Run Reconciliation</Button>
          <Button variant="secondary" onClick={() => downloadMockCsv('reference,status\nGPY-1001,MATCHED', 'reconciliation-app.csv')}>
            Export App CSV
          </Button>
          <Button variant="secondary" onClick={() => downloadMockCsv('reference,status\nGPY-1009,EXCEPTION', 'reconciliation-ghipss.csv')}>
            Export GhIPSS CSV
          </Button>
        </div>
      </Card>
      <Card title="Reconciliation exceptions table">
        <DataTable
          columns={[
            { key: 'id', header: 'ID', render: (row) => row.id },
            { key: 'source', header: 'Source', render: (row) => row.source },
            { key: 'reference', header: 'Reference', render: (row) => row.reference },
            { key: 'amount', header: 'Amount', render: (row) => formatCurrency(row.amount) },
            { key: 'status', header: 'Status', render: (row) => row.status },
            { key: 'note', header: 'Note', render: (row) => row.note },
          ]}
          rows={(view?.items ?? []).filter((item) => item.status === 'EXCEPTION' || item.status === 'PENDING' || item.status === 'UNMATCHED')}
        />
      </Card>
    </div>
  )
}

export default ReconciliationPage
