import { defaultBranding } from '../config/branding'

export const formatGhs = (amount: number) =>
  new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: defaultBranding.currency,
    minimumFractionDigits: 2,
  }).format(amount)
