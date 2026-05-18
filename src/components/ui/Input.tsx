import type { InputHTMLAttributes } from 'react'

const Input = ({ label, error, ...props }: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) => (
  <label className="grid gap-1 text-sm text-slate-700">
    <span>{label}</span>
    <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" {...props} />
    {error ? <span className="text-xs text-rose-600">{error}</span> : null}
  </label>
)

export default Input
