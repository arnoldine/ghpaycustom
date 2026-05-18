import type { KycStatus } from './kyc'
import type { Transaction } from './transaction'

export interface DashboardStats {
  totalWallets: number
  activeWallets: number
  totalTransactionValueToday: number
  transactionCountToday: number
  failedTransactions: number
  pendingReconciliations: number
  openDisputes: number
  suspiciousAlerts: number
  channelVolume: Array<{ channel: string; value: number }>
  successFailedTrend: Array<{ name: string; success: number; failed: number }>
  walletGrowth: Array<{ month: string; wallets: number }>
}

export interface AdminCustomer {
  id: string
  fullName: string
  phone: string
  ghanaCard: string
  kycStatus: KycStatus
  walletStatus: 'ACTIVE' | 'DORMANT' | 'BLOCKED'
}

export interface AdminTransactionView extends Transaction {
  customer: string
}

export interface RiskAlert {
  id: string
  alertType:
    | 'multiple failed PIN attempts'
    | 'unusual transaction amount'
    | 'new device login'
    | 'repeated failed transfers'
    | 'high cash-out frequency'
  customer: string
  timestamp: string
  status: 'OPEN' | 'ACKNOWLEDGED' | 'CLOSED'
}

export interface AuditLog {
  id: string
  user: string
  action: string
  module: string
  timestamp: string
  ipOrDevice: string
  outcome: 'SUCCESS' | 'FAILED'
}
