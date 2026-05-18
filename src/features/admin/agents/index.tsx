import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'

const rows = [
  { id: 'AG001', name: 'Accra Mall Agent', status: 'ACTIVE', float: 'GHS 12,000' },
  { id: 'AG002', name: 'Tamale Central Agent', status: 'ACTIVE', float: 'GHS 8,600' },
]

const AgentsPage = () => (
  <Card title="Agent Management">
    <DataTable
      columns={[
        { key: 'id', header: 'Agent ID', render: (row) => row.id },
        { key: 'name', header: 'Agent Name', render: (row) => row.name },
        { key: 'status', header: 'Status', render: (row) => row.status },
        { key: 'float', header: 'Float', render: (row) => row.float },
      ]}
      rows={rows}
    />
  </Card>
)

export default AgentsPage
