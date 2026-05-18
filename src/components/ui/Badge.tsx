import clsx from 'clsx'

export const Badge = ({ text, tone = 'slate' }: { text: string; tone?: 'green' | 'amber' | 'red' | 'slate' }) => (
  <span
    className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-semibold', {
      'bg-green-100 text-green-800': tone === 'green',
      'bg-amber-100 text-amber-800': tone === 'amber',
      'bg-red-100 text-red-800': tone === 'red',
      'bg-slate-100 text-slate-700': tone === 'slate',
    })}
  >
    {text}
  </span>
)
