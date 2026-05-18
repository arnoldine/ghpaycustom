import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'

const walletRows = [
  { walletId: 'WAL-1020001', owner: 'Ama Mensah', status: 'ACTIVE', balance: 'GHS 4,820.55' },
  { walletId: 'WAL-1020012', owner: 'Kofi Osei', status: 'ACTIVE', balance: 'GHS 9,200.00' },
]

const AdminWalletsPage = () => (
  <Card title="Wallet Management">
    <DataTable
      columns={[
        { key: 'walletId', header: 'Wallet ID', render: (row) => row.walletId },
        { key: 'owner', header: 'Owner', render: (row) => row.owner },
        { key: 'status', header: 'Status', render: (row) => row.status },
        { key: 'balance', header: 'Balance', render: (row) => row.balance },
      ]}
      rows={walletRows}
    />
  </Card>
)

export default AdminWalletsPage
