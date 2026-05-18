import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'

export const ComplaintsPage = () => {
  const [subject, setSubject] = useState('')
  const [tickets, setTickets] = useState([
    { id: 'CPT-1001', subject: 'Delayed transfer reversal', status: 'IN_REVIEW' },
    { id: 'CPT-1002', subject: 'Airtime debit issue', status: 'OPEN' },
  ])

  const submit = () => {
    if (!subject) return
    setTickets([{ id: `CPT-${Date.now()}`, subject, status: 'OPEN' }, ...tickets])
    setSubject('')
  }

  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-semibold">Complaints & Support</h1>
      <div className="flex gap-2">
        <Input placeholder="Describe issue" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Button onClick={submit}>Submit</Button>
      </div>
      <div className="space-y-2 text-sm">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="rounded border p-2">
            <p className="font-medium">{ticket.subject}</p>
            <p className="text-slate-500">{ticket.id} • {ticket.status}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
