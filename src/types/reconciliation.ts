export interface ReconciliationOverview {
  matched: number
  unmatched: number
  pending: number
  exceptions: number
}

export interface ReconciliationItem {
  id: string
  source: 'APP' | 'BACKEND' | 'GHIPSS' | 'CBS'
  reference: string
  amount: number
  status: 'MATCHED' | 'UNMATCHED' | 'PENDING' | 'EXCEPTION'
  note: string
}
