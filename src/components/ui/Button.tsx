import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

export const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={clsx(
      'rounded-lg px-4 py-2 text-sm font-semibold text-white bg-brand-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  />
)
