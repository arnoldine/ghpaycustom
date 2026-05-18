export interface WalletBalance {
  walletId: string
  availableBalance: number
  ledgerBalance: number
  currency: 'GHS'
}

export type TransferDestination = 'GHANAPAY_WALLET' | 'BANK_ACCOUNT' | 'MOBILE_MONEY'

export interface TransferRequest {
  destinationType: TransferDestination
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
}
