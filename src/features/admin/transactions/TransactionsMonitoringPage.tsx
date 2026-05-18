import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { adminApi } from '../../../api/adminApi'
import { Badge } from '../../../components/ui/Badge'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { Input } from '../../../components/ui/Input'
import { Modal } from '../../../components/ui/Modal'
import { Select } from '../../../components/ui/Select'
import { formatGhs } from '../../../utils/currency'
import { formatDateTime } from '../../../utils/dates'

export const TransactionsMonitoringPage = () => {
  const query = useQuery({ queryKey: ['admin-transactions'], queryFn: adminApi.getTransactions })
  const [status, setStatus] = useState('')
  const [channel, setChannel] = useState('')
  const [minAmount, setMinAmount] = useState('')
  const [maxAmount, setMaxAmount] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const rows = useMemo(() => {
    return (query.data?.data ?? []).filter((tx) => {
      const time = new Date(tx.createdAt).getTime()
      const from = fromDate ? new Date(fromDate).getTime() : -Infinity
      const to = toDate ? new Date(toDate).getTime() : Infinity
      const amt = tx.amount
      return (
        (!status || tx.status === status) &&
        (!channel || tx.channel === channel) &&
        (!minAmount || amt >= Number(minAmount)) &&
        (!maxAmount || amt <= Number(maxAmount)) &&
        time >= from &&
        time <= to
      )
    })
  }, [query.data, status, channel, minAmount, maxAmount, fromDate, toDate])

  const selected = rows.find((r) => r.id === selectedId)

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Transaction Monitoring</h1>
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
        <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="SUCCESSFUL">SUCCESSFUL</option>
          <option value="PENDING">PENDING</option>
          <option value="FAILED">FAILED</option>
          <option value="REVERSED">REVERSED</option>
        </Select>
        <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
          <option value="">All Channel</option>
          <option value="GHANAPAY_WALLET">GHANAPAY_WALLET</option>
          <option value="BANK_TRANSFER">BANK_TRANSFER</option>
          <option value="MOBILE_MONEY">MOBILE_MONEY</option>
          <option value="GHQR">GHQR</option>
          <option value="CASH_IN">CASH_IN</option>
          <option value="CASH_OUT">CASH_OUT</option>
        </Select>
        <Input placeholder="Min amount" type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
        <Input placeholder="Max amount" type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
      </div>
      <DataTable
        rows={rows}
        columns={[
          { header: 'Transaction ID', render: (r) => r.id },
          { header: 'Date/Time', render: (r) => formatDateTime(r.createdAt) },
          { header: 'Customer', render: (r) => r.customerName },
          { header: 'Channel', render: (r) => r.channel },
          { header: 'Amount', render: (r) => formatGhs(r.amount) },
          { header: 'Status', render: (r) => <Badge text={r.status} tone={r.status === 'SUCCESSFUL' ? 'green' : r.status === 'PENDING' ? 'amber' : 'red'} /> },
          { header: 'Reference', render: (r) => r.reference },
          { header: 'Narration', render: (r) => r.narration },
          { header: 'Detail', render: (r) => <button className="text-brand-primary" onClick={() => setSelectedId(r.id)}>View</button> },
        ]}
      />
      <h2 className="text-lg font-semibold">Failed/Pending Queue</h2>
      <DataTable
        rows={rows.filter((r) => r.status === 'FAILED' || r.status === 'PENDING')}
        columns={[
          { header: 'ID', render: (r) => r.id },
          { header: 'Status', render: (r) => r.status },
          { header: 'Amount', render: (r) => formatGhs(r.amount) },
          { header: 'Reference', render: (r) => r.reference },
        ]}
      />
      <Modal open={!!selected} title="Transaction Detail" onClose={() => setSelectedId(null)}>
        {selected ? (
          <div className="text-sm">
            <p>ID: {selected.id}</p>
            <p>Date/Time: {formatDateTime(selected.createdAt)}</p>
            <p>Customer: {selected.customerName}</p>
            <p>Channel: {selected.channel}</p>
            <p>Amount: {formatGhs(selected.amount)}</p>
            <p>Status: {selected.status}</p>
            <p>Reference: {selected.reference}</p>
            <p>Narration: {selected.narration}</p>
          </div>
        ) : null}
      </Modal>
    </Card>
  )
}
