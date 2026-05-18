import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import LoadingState from '../../../components/ui/LoadingState'

const RiskPage = () => {
  const query = useQuery({ queryKey: ['risk-alerts'], queryFn: () => adminApi.getRiskAlerts() })

  if (query.isLoading) {
    return <LoadingState message="Loading risk alerts..." />
  }

  return (
    <Card title="Suspicious Activity Alerts">
      <DataTable
        columns={[
          { key: 'id', header: 'ID', render: (row) => row.id },
          { key: 'type', header: 'Alert Type', render: (row) => row.alertType },
          { key: 'customer', header: 'Customer', render: (row) => row.customer },
          { key: 'time', header: 'Timestamp', render: (row) => new Date(row.timestamp).toLocaleString('en-GH') },
          { key: 'status', header: 'Status', render: (row) => row.status },
        ]}
        rows={query.data?.data ?? []}
      />
    </Card>
  )
}

export default RiskPage
