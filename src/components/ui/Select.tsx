import type { ReactNode, SelectHTMLAttributes } from 'react'

const Select = ({ label, children, ...props }: { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) => (
  <label className="grid gap-1 text-sm text-slate-700">
    <span>{label}</span>
    <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" {...props}>
      {children}
    </select>
  </label>
)

export default Select
