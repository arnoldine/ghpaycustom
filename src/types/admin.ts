import type { CustomerProfile } from './customer'
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
}

export interface AdminCustomerSummary extends CustomerProfile {
  walletId: string
  recentTransactions: Transaction[]
}

export interface ChartPoint {
  name: string
  value: number
  success?: number
  failed?: number
}

export interface AdminDashboardPayload {
  stats: DashboardStats
  volumeByChannel: ChartPoint[]
  successVsFailed: ChartPoint[]
  walletGrowth: ChartPoint[]
}
