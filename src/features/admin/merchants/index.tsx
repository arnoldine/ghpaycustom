import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'

const rows = [
  { id: 'MER001', name: 'QuickMart', category: 'Retail', status: 'ACTIVE' },
  { id: 'MER002', name: 'City Pharmacy', category: 'Health', status: 'PENDING' },
]

const MerchantsPage = () => (
  <Card title="Merchant Management">
    <DataTable
      columns={[
        { key: 'id', header: 'Merchant ID', render: (row) => row.id },
        { key: 'name', header: 'Merchant Name', render: (row) => row.name },
        { key: 'cat', header: 'Category', render: (row) => row.category },
        { key: 'status', header: 'Status', render: (row) => row.status },
      ]}
      rows={rows}
    />
  </Card>
)

export default MerchantsPage
