import type { Role } from '../types/auth'

export interface NavItem {
  label: string
  path: string
  roles: Role[]
}

export const customerNav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', roles: ['CUSTOMER'] },
  { label: 'Wallet', path: '/wallet', roles: ['CUSTOMER'] },
  { label: 'Transfers', path: '/transfers', roles: ['CUSTOMER'] },
  { label: 'Cash-In', path: '/cash-in', roles: ['CUSTOMER'] },
  { label: 'Cash-Out', path: '/cash-out', roles: ['CUSTOMER'] },
  { label: 'GhQR', path: '/ghqr', roles: ['CUSTOMER'] },
  { label: 'Airtime', path: '/airtime', roles: ['CUSTOMER'] },
  { label: 'Bills', path: '/bills', roles: ['CUSTOMER'] },
  { label: 'Statements', path: '/statements', roles: ['CUSTOMER'] },
  { label: 'Complaints', path: '/complaints', roles: ['CUSTOMER'] },
  { label: 'Profile', path: '/profile', roles: ['CUSTOMER'] },
  { label: 'KYC', path: '/kyc', roles: ['CUSTOMER'] },
  { label: 'Devices', path: '/devices', roles: ['CUSTOMER'] },
]

export const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', roles: ['ADMIN', 'OPERATIONS', 'COMPLIANCE', 'SUPPORT', 'AUDITOR'] },
  { label: 'Customers', path: '/admin/customers', roles: ['ADMIN', 'OPERATIONS', 'SUPPORT'] },
  { label: 'Wallets', path: '/admin/wallets', roles: ['ADMIN', 'OPERATIONS'] },
  { label: 'Transactions', path: '/admin/transactions', roles: ['ADMIN', 'OPERATIONS', 'COMPLIANCE'] },
  { label: 'Reconciliation', path: '/admin/reconciliation', roles: ['ADMIN', 'OPERATIONS', 'AUDITOR'] },
  { label: 'Agents', path: '/admin/agents', roles: ['ADMIN', 'AGENT_MANAGER'] },
  { label: 'Merchants', path: '/admin/merchants', roles: ['ADMIN', 'MERCHANT_MANAGER'] },
  { label: 'Disputes', path: '/admin/disputes', roles: ['ADMIN', 'SUPPORT'] },
  { label: 'Risk', path: '/admin/risk', roles: ['ADMIN', 'COMPLIANCE'] },
  { label: 'Reports', path: '/admin/reports', roles: ['ADMIN', 'OPERATIONS', 'AUDITOR'] },
  { label: 'Audit Logs', path: '/admin/audit-logs', roles: ['ADMIN', 'AUDITOR', 'COMPLIANCE'] },
  { label: 'Settings', path: '/admin/settings', roles: ['ADMIN'] },
]
