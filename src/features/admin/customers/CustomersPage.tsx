import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { adminApi } from '../../../api/adminApi'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { Input } from '../../../components/ui/Input'
import { maskGhanaCard, maskPhone } from '../../../utils/validation'

export const CustomersPage = () => {
  const [search, setSearch] = useState('')
  const query = useQuery({ queryKey: ['admin-customers', search], queryFn: () => adminApi.getCustomers(search) })
  const rows = query.data?.data ?? []

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Customer Management</h1>
      <Input
        placeholder="Search name, phone, Ghana Card, KYC status, wallet status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DataTable
        rows={rows}
        columns={[
          { header: 'Customer', render: (r) => <div><p className="font-medium">{r.fullName}</p><p className="text-xs text-slate-500">{r.email}</p></div> },
          { header: 'Phone', render: (r) => maskPhone(r.phone) },
          { header: 'Ghana Card', render: (r) => maskGhanaCard(r.ghanaCard) },
          { header: 'KYC', render: (r) => <Badge text={r.kycStatus} tone={r.kycStatus === 'VERIFIED' ? 'green' : 'amber'} /> },
          { header: 'Wallet', render: (r) => `${r.walletId} (${r.walletStatus})` },
          { header: 'Recent Tx', render: (r) => r.recentTransactions.map((tx) => tx.reference).join(', ') || 'None' },
        ]}
      />
    </Card>
  )
}
