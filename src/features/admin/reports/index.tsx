import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'

const ReportsPage = () => (
  <Card title="Reports">
    <p className="mb-3 text-sm text-slate-600">Settlement, transaction, and audit exports for operations and auditors.</p>
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary">Export settlement report</Button>
      <Button variant="secondary">Export transaction report</Button>
      <Button variant="secondary">Export compliance report</Button>
    </div>
  </Card>
)

export default ReportsPage
