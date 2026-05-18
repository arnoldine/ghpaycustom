import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import Input from '../../../components/ui/Input'
import LoadingState from '../../../components/ui/LoadingState'

const AdminCustomersPage = () => {
  const customersQuery = useQuery({ queryKey: ['admin-customers'], queryFn: () => adminApi.getCustomers() })
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    const customers = customersQuery.data?.data ?? []
    return customers.filter((customer) => {
      const haystack = `${customer.fullName} ${customer.phone} ${customer.ghanaCard} ${customer.kycStatus} ${customer.walletStatus}`.toLowerCase()
      return haystack.includes(search.toLowerCase())
    })
  }, [customersQuery.data?.data, search])

  if (customersQuery.isLoading) {
    return <LoadingState message="Loading customers..." />
  }

  return (
    <div className="grid gap-4">
      <Card title="Customer Management">
        <Input label="Search by name, phone, Ghana Card, KYC, wallet status" value={search} onChange={(event) => setSearch(event.target.value)} />
      </Card>
      <Card title="Customer profiles">
        <DataTable
          columns={[
            { key: 'name', header: 'Name', render: (row) => row.fullName },
            { key: 'phone', header: 'Phone', render: (row) => row.phone },
            { key: 'ghanaCard', header: 'Ghana Card', render: (row) => `${row.ghanaCard.slice(0, 8)}******` },
            { key: 'kyc', header: 'KYC Status', render: (row) => row.kycStatus },
            { key: 'wallet', header: 'Wallet Status', render: (row) => row.walletStatus },
          ]}
          rows={rows}
        />
      </Card>
    </div>
  )
}

export default AdminCustomersPage
