export type TransactionStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REVERSED'
export type TransactionChannel =
  | 'GHANAPAY_WALLET'
  | 'BANK_TRANSFER'
  | 'MOBILE_MONEY'
  | 'GHQR'
  | 'CASH_IN'
  | 'CASH_OUT'
  | 'AIRTIME'
  | 'BILL_PAYMENT'

export interface Transaction {
  id: string
  customerId: string
  customerName: string
  channel: TransactionChannel
  amount: number
  status: TransactionStatus
  reference: string
  narration: string
  createdAt: string
}

export interface PaymentRequest {
  merchantId?: string
  amount: number
  narration: string
  pin: string
  biller?: string
  phone?: string
}

export interface Receipt {
  transactionId: string
  reference: string
  amount: number
  channel: string
  status: TransactionStatus
  narration: string
  customerName: string
  timestamp: string
  auditTrail: string
}
