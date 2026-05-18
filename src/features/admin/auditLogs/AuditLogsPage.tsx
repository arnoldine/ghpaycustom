import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'

export const AuditLogsPage = () => {
  const query = useQuery({ queryKey: ['audit-logs'], queryFn: adminApi.getAuditLogs })
  return (
    <Card>
      <h1 className="mb-3 text-xl font-semibold">Audit Logs</h1>
      <DataTable
        rows={query.data?.data ?? []}
        columns={[
          { header: 'User', render: (r) => r.user },
          { header: 'Action', render: (r) => r.action },
          { header: 'Module', render: (r) => r.module },
          { header: 'Timestamp', render: (r) => new Date(r.timestamp).toLocaleString() },
          { header: 'IP/Device', render: (r) => r.ipDevice },
          { header: 'Outcome', render: (r) => r.outcome },
        ]}
      />
    </Card>
  )
}
