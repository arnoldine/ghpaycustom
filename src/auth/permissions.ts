import type { Role } from '../types/auth'

export type AdminModule =
  | 'dashboard'
  | 'customers'
  | 'wallets'
  | 'transactions'
  | 'reconciliation'
  | 'agents'
  | 'merchants'
  | 'disputes'
  | 'risk'
  | 'reports'
  | 'auditLogs'
  | 'settings'

const permissions: Record<Role, AdminModule[]> = {
  CUSTOMER: [],
  ADMIN: ['dashboard', 'customers', 'wallets', 'transactions', 'reconciliation', 'agents', 'merchants', 'disputes', 'risk', 'reports', 'auditLogs', 'settings'],
  OPERATIONS: ['dashboard', 'customers', 'wallets', 'transactions', 'reconciliation', 'reports'],
  COMPLIANCE: ['dashboard', 'transactions', 'disputes', 'risk', 'auditLogs'],
  SUPPORT: ['dashboard', 'customers', 'transactions', 'disputes'],
  AGENT_MANAGER: ['agents'],
  MERCHANT_MANAGER: ['merchants'],
  AUDITOR: ['dashboard', 'reconciliation', 'reports', 'auditLogs'],
}

export const canAccessModule = (role: Role, module: AdminModule): boolean => permissions[role].includes(module)
