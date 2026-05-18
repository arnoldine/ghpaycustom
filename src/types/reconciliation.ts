export type ReconciliationStatus = 'MATCHED' | 'UNMATCHED' | 'PENDING' | 'EXCEPTION'

export interface ReconciliationItem {
  id: string
  source: 'APP' | 'BACKEND' | 'GHIPSS' | 'CBS'
  reference: string
  amount: number
  status: ReconciliationStatus
  createdAt: string
}

export interface ReconciliationSummary {
  matched: number
  unmatched: number
  pending: number
  exception: number
}
