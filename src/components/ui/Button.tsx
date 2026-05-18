import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => (
  <button
    className={clsx(
      'rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
      variant === 'primary' && 'bg-emerald-700 text-white hover:bg-emerald-800',
      variant === 'secondary' && 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
      variant === 'danger' && 'bg-rose-700 text-white hover:bg-rose-800',
      className,
    )}
    {...props}
  />
)

export default Button
