import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'

export const RiskPage = () => {
  const query = useQuery({ queryKey: ['risk-alerts'], queryFn: adminApi.getRiskAlerts })
  return (
    <Card>
      <h1 className="mb-3 text-xl font-semibold">Risk Monitoring & Suspicious Activity Alerts</h1>
      <DataTable
        rows={query.data?.data ?? []}
        columns={[
          { header: 'Alert ID', render: (r) => r.id },
          { header: 'Type', render: (r) => r.type },
          { header: 'Customer', render: (r) => r.customer },
          {
            header: 'Severity',
            render: (r) => <Badge text={r.severity} tone={r.severity === 'HIGH' ? 'red' : r.severity === 'MEDIUM' ? 'amber' : 'slate'} />,
          },
        ]}
      />
    </Card>
  )
}
