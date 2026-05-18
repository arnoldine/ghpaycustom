const LoadingState = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">{message}</div>
)

export default LoadingState
