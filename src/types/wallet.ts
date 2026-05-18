export type TransferDestinationType = 'GHANAPAY_WALLET' | 'BANK_ACCOUNT' | 'MOBILE_MONEY'
export type TransactionStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REVERSED'
export type TransactionChannel =
  | 'GHANAPAY_WALLET'
  | 'BANK_ACCOUNT'
  | 'MOBILE_MONEY'
  | 'CASH_IN'
  | 'CASH_OUT'
  | 'GHQR'
  | 'AIRTIME'
  | 'BILL_PAYMENT'

export interface WalletBalance {
  walletId: string
  currency: 'GHS'
  availableBalance: number
  ledgerBalance: number
}

export interface TransferRequest {
  destinationType: TransferDestinationType
  recipientName: string
  recipientAccountOrPhone: string
  institutionOrNetwork: string
  amount: number
  narration: string
  pin: string
}

export interface CashTransactionRequest {
  amount: number
  agentCode: string
  customerPhone: string
  narration: string
  pin: string
  type: 'CASH_IN' | 'CASH_OUT'
}

export interface PaymentRequest {
  merchantId: string
  amount: number
  narration: string
  pin: string
}
