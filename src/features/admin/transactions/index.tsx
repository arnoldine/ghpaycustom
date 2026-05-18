import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { adminApi } from '../../../api/adminApi'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import Input from '../../../components/ui/Input'
import LoadingState from '../../../components/ui/LoadingState'
import Modal from '../../../components/ui/Modal'
import Select from '../../../components/ui/Select'
import { formatCurrency } from '../../../utils/currency'
import { formatDateTime } from '../../../utils/dates'

const AdminTransactionsPage = () => {
  const query = useQuery({ queryKey: ['admin-transactions'], queryFn: () => adminApi.getTransactions() })
  const [status, setStatus] = useState('')
  const [channel, setChannel] = useState('')
  const [amountRange, setAmountRange] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filteredRows = useMemo(() => {
    const rows = query.data?.data ?? []
    return rows.filter((item) => {
      const statusPass = !status || item.status === status
      const channelPass = !channel || item.channel === channel
      const amountPass = !amountRange || (amountRange === 'LOW' ? item.amount < 100 : amountRange === 'MID' ? item.amount < 500 : item.amount >= 500)
      return statusPass && channelPass && amountPass
    })
  }, [amountRange, channel, query.data?.data, status])

  const selected = filteredRows.find((item) => item.id === selectedId)

  if (query.isLoading) {
    return <LoadingState message="Loading transactions..." />
  }

  return (
    <div className="grid gap-4">
      <Card title="Filters">
        <div className="grid gap-3 md:grid-cols-4">
          <Input label="Date range" placeholder="Use app date picker integration" />
          <Select label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All</option>
            <option value="SUCCESSFUL">SUCCESSFUL</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </Select>
          <Select label="Channel" value={channel} onChange={(event) => setChannel(event.target.value)}>
            <option value="">All</option>
            <option value="GHANAPAY_WALLET">GHANAPAY_WALLET</option>
            <option value="BANK_ACCOUNT">BANK_ACCOUNT</option>
            <option value="MOBILE_MONEY">MOBILE_MONEY</option>
            <option value="GHQR">GHQR</option>
          </Select>
          <Select label="Amount range" value={amountRange} onChange={(event) => setAmountRange(event.target.value)}>
            <option value="">Any</option>
            <option value="LOW">Below GHS 100</option>
            <option value="MID">GHS 100 - 500</option>
            <option value="HIGH">Above GHS 500</option>
          </Select>
        </div>
      </Card>
      <Card title="Transaction monitoring queue">
        <DataTable
          columns={[
            { key: 'id', header: 'Transaction ID', render: (row) => row.id },
            { key: 'date', header: 'Date/Time', render: (row) => formatDateTime(row.dateTime) },
            { key: 'customer', header: 'Customer', render: (row) => row.customer },
            { key: 'channel', header: 'Channel', render: (row) => row.channel },
            { key: 'amount', header: 'Amount', render: (row) => formatCurrency(row.amount) },
            { key: 'status', header: 'Status', render: (row) => row.status },
            { key: 'reference', header: 'Reference', render: (row) => row.reference },
            { key: 'narration', header: 'Narration', render: (row) => row.narration },
            {
              key: 'action',
              header: 'Detail',
              render: (row) => (
                <button className="text-emerald-700" onClick={() => setSelectedId(row.id)}>
                  View
                </button>
              ),
            },
          ]}
          rows={filteredRows}
        />
      </Card>
      <Card title="Failed / Pending Queue">
        <p className="text-sm text-slate-600">{filteredRows.filter((row) => row.status === 'FAILED' || row.status === 'PENDING').length} items require follow-up.</p>
      </Card>
      <Modal open={Boolean(selected)} title="Transaction details" onClose={() => setSelectedId(null)}>
        {selected ? (
          <div className="grid gap-1 text-xs">
            <p><strong>ID:</strong> {selected.id}</p>
            <p><strong>Reference:</strong> {selected.reference}</p>
            <p><strong>Customer:</strong> {selected.customer}</p>
            <p><strong>Narration:</strong> {selected.narration}</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

export default AdminTransactionsPage
