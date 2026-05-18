export const formatDateTime = (iso: string): string =>
  new Date(iso).toLocaleString('en-GH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
