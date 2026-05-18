import { mockServer } from './mockServer'

export const adminApi = {
  getDashboardStats: () => mockServer.getDashboardStats(),
  getCustomers: (query?: string) => mockServer.getCustomers(query),
  getCustomerProfile: (customerId?: string) => mockServer.getCustomerProfile(customerId),
  getTransactions: () => mockServer.getAdminTransactions(),
  getDisputes: () => mockServer.getDisputes(),
  updateDispute: (id: string, status: string, note: string) => mockServer.updateDispute(id, status, note),
  getRiskAlerts: () => mockServer.getRiskAlerts(),
  getAuditLogs: () => mockServer.getAuditLogs(),
  listWallets: () => mockServer.listWallets(),
}
