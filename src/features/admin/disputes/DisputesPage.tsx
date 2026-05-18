import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { adminApi } from '../../../api/adminApi'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { DataTable } from '../../../components/ui/DataTable'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'

export const DisputesPage = () => {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('OPEN')
  const [note, setNote] = useState('')
  const [activeId, setActiveId] = useState<string>('')
  const query = useQuery({ queryKey: ['admin-disputes'], queryFn: adminApi.getDisputes })
  const mutation = useMutation({
    mutationFn: ({ id, nextStatus, internalNote }: { id: string; nextStatus: string; internalNote: string }) =>
      adminApi.updateDispute(id, nextStatus, internalNote),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['admin-disputes'] }),
  })

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Dispute / Complaint Management</h1>
      <DataTable
        rows={query.data?.data ?? []}
        columns={[
          { header: 'ID', render: (r) => r.id },
          { header: 'Customer', render: (r) => r.customer },
          { header: 'Subject', render: (r) => r.subject },
          {
            header: 'Status',
            render: (r) => (
              <Badge
                text={r.status}
                tone={r.status === 'RESOLVED' ? 'green' : r.status === 'IN_REVIEW' ? 'amber' : r.status === 'ESCALATED' ? 'red' : 'slate'}
              />
            ),
          },
          { header: 'Internal Note', render: (r) => r.note },
          { header: 'Action', render: (r) => <button className="text-brand-primary" onClick={() => setActiveId(r.id)}>Update</button> },
        ]}
      />

      {activeId && (
        <div className="space-y-2 rounded border p-3">
          <p className="text-sm font-medium">Update dispute {activeId}</p>
          <div className="grid gap-2 md:grid-cols-2">
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="OPEN">OPEN</option>
              <option value="IN_REVIEW">IN_REVIEW</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="ESCALATED">ESCALATED</option>
            </Select>
            <Input placeholder="Internal note" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <Button onClick={() => void mutation.mutateAsync({ id: activeId, nextStatus: status, internalNote: note })}>Save Update</Button>
        </div>
      )}
    </Card>
  )
}
