import { branding } from '../config/branding'

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: branding.currency,
    minimumFractionDigits: 2,
  }).format(amount)
