import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reconciliationApi } from '../../../api/reconciliationApi'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { StatCard } from '../../../components/ui/StatCard'
import { formatGhs } from '../../../utils/currency'

export const ReconciliationPage = () => {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['reconciliation-dashboard'], queryFn: reconciliationApi.getDashboard })
  const runMutation = useMutation({
    mutationFn: reconciliationApi.runReconciliation,
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['reconciliation-dashboard'] }),
  })

  const exportCsv = () => {
    const lines = (query.data?.data.items ?? []).map((i) => `${i.id},${i.source},${i.reference},${i.amount},${i.status},${i.createdAt}`)
    const csv = ['id,source,reference,amount,status,createdAt', ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reconciliation-exceptions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const data = query.data?.data

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap gap-2">
        <Button onClick={() => void runMutation.mutateAsync()}>Run Reconciliation</Button>
        <Button className="bg-slate-600" onClick={exportCsv}>Export CSV</Button>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Matched" value={String(data?.summary.matched ?? 0)} />
        <StatCard label="Unmatched" value={String(data?.summary.unmatched ?? 0)} />
        <StatCard label="Pending" value={String(data?.summary.pending ?? 0)} />
        <StatCard label="Exception" value={String(data?.summary.exception ?? 0)} />
      </div>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Reconciliation Exceptions Table</h2>
        <DataTable
          rows={(data?.items ?? []).filter((i) => i.status !== 'MATCHED')}
          columns={[
            { header: 'ID', render: (r) => r.id },
            { header: 'Source', render: (r) => r.source },
            { header: 'Reference', render: (r) => r.reference },
            { header: 'Amount', render: (r) => formatGhs(r.amount) },
            { header: 'Status', render: (r) => r.status },
            { header: 'Created', render: (r) => new Date(r.createdAt).toLocaleString() },
          ]}
        />
      </Card>
    </div>
  )
}
