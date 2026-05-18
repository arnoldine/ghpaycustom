import { Card } from './Card'

export const StatCard = ({ label, value }: { label: string; value: string }) => (
  <Card>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-800">{value}</p>
  </Card>
)
