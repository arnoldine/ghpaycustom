const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-xs uppercase text-slate-500">{label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
  </div>
)

export default StatCard
