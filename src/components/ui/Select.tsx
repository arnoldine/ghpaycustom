import clsx from 'clsx'
import type { SelectHTMLAttributes } from 'react'

export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={clsx('w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none', className)}
    {...props}
  />
)
