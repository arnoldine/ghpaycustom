export const LoadingState = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="animate-pulse rounded-lg bg-slate-100 p-4 text-sm text-slate-500">{label}</div>
)
