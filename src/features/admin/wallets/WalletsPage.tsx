import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { formatGhs } from '../../../utils/currency'

export const WalletsPage = () => {
  const query = useQuery({ queryKey: ['admin-wallets'], queryFn: adminApi.listWallets })

  return (
    <Card>
      <h1 className="mb-3 text-xl font-semibold">Wallet Management</h1>
      <DataTable
        rows={query.data?.data ?? []}
        columns={[
          { header: 'Wallet ID', render: (r) => r.walletId },
          { header: 'Available', render: (r) => formatGhs(r.availableBalance) },
          { header: 'Ledger', render: (r) => formatGhs(r.ledgerBalance) },
          { header: 'Currency', render: (r) => r.currency },
        ]}
      />
    </Card>
  )
}
