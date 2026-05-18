import type { TransactionChannel, TransactionStatus } from './wallet'

export interface Transaction {
  id: string
  reference: string
  customerId: string
  customerName: string
  amount: number
  channel: TransactionChannel
  status: TransactionStatus
  narration: string
  dateTime: string
}

export interface ReceiptData {
  transactionId: string
  reference: string
  amount: number
  channel: TransactionChannel
  status: TransactionStatus
  narration: string
  dateTime: string
  customerName: string
  institutionName: string
}
