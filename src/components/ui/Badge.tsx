import clsx from 'clsx'

const Badge = ({ label, tone = 'info' }: { label: string; tone?: 'info' | 'success' | 'warning' | 'danger' }) => (
  <span
    className={clsx(
      'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
      tone === 'info' && 'bg-slate-100 text-slate-700',
      tone === 'success' && 'bg-emerald-100 text-emerald-800',
      tone === 'warning' && 'bg-amber-100 text-amber-800',
      tone === 'danger' && 'bg-rose-100 text-rose-800',
    )}
  >
    {label}
  </span>
)

export default Badge
