import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('rounded-xl border border-slate-200 bg-white p-4 shadow-sm', className)} {...props} />
)
