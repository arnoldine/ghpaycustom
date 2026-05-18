import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import LoadingState from '../../../components/ui/LoadingState'

const AuditLogsPage = () => {
  const query = useQuery({ queryKey: ['audit-logs'], queryFn: () => adminApi.getAuditLogs() })

  if (query.isLoading) {
    return <LoadingState message="Loading audit logs..." />
  }

  return (
    <Card title="Audit Logs">
      <DataTable
        columns={[
          { key: 'user', header: 'User', render: (row) => row.user },
          { key: 'action', header: 'Action', render: (row) => row.action },
          { key: 'module', header: 'Module', render: (row) => row.module },
          { key: 'timestamp', header: 'Timestamp', render: (row) => new Date(row.timestamp).toLocaleString('en-GH') },
          { key: 'ip', header: 'IP/Device', render: (row) => row.ipOrDevice },
          { key: 'outcome', header: 'Outcome', render: (row) => row.outcome },
        ]}
        rows={query.data?.data ?? []}
      />
    </Card>
  )
}

export default AuditLogsPage
