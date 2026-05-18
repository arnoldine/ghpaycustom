import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={clsx('w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none', className)}
    {...props}
  />
)
