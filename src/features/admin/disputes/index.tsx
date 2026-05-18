import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { adminApi } from '../../../api/adminApi'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import DataTable from '../../../components/ui/DataTable'
import LoadingState from '../../../components/ui/LoadingState'
import Modal from '../../../components/ui/Modal'
import Select from '../../../components/ui/Select'

const DisputesPage = () => {
  const queryClient = useQueryClient()
  const complaintsQuery = useQuery({ queryKey: ['admin-complaints'], queryFn: () => adminApi.getComplaints() })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState<'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'ESCALATED'>('IN_REVIEW')
  const [note, setNote] = useState('')

  const mutation = useMutation({
    mutationFn: ({ id, payloadStatus, payloadNote }: { id: string; payloadStatus: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'ESCALATED'; payloadNote: string }) =>
      adminApi.updateComplaintStatus(id, payloadStatus, payloadNote),
    onSuccess: async () => {
      setSelectedId(null)
      await queryClient.invalidateQueries({ queryKey: ['admin-complaints'] })
    },
  })

  if (complaintsQuery.isLoading) {
    return <LoadingState message="Loading disputes..." />
  }

  return (
    <Card title="Dispute / Complaint Management">
      <DataTable
        columns={[
          { key: 'id', header: 'ID', render: (row) => row.id },
          { key: 'title', header: 'Title', render: (row) => row.title },
          { key: 'status', header: 'Status', render: (row) => row.status },
          { key: 'created', header: 'Created', render: (row) => new Date(row.createdAt).toLocaleString('en-GH') },
          { key: 'note', header: 'Internal Note', render: (row) => row.internalNote ?? '-' },
          {
            key: 'action',
            header: 'Action',
            render: (row) => (
              <Button variant="secondary" onClick={() => setSelectedId(row.id)}>
                Update
              </Button>
            ),
          },
        ]}
        rows={complaintsQuery.data?.data ?? []}
      />
      <Modal open={Boolean(selectedId)} title="Update dispute status" onClose={() => setSelectedId(null)} onConfirm={() => selectedId && mutation.mutate({ id: selectedId, payloadStatus: status, payloadNote: note })}>
        <div className="grid gap-2">
          <Select label="Status" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}>
            <option value="OPEN">OPEN</option>
            <option value="IN_REVIEW">IN_REVIEW</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="ESCALATED">ESCALATED</option>
          </Select>
          <label className="grid gap-1 text-sm">
            <span>Internal note</span>
            <textarea className="rounded-lg border border-slate-300 px-3 py-2" rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
        </div>
      </Modal>
    </Card>
  )
}

export default DisputesPage
