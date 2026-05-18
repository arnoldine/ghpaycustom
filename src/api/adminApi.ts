import { mockServer } from './mockServer'

export const adminApi = {
  getDashboardStats: mockServer.getDashboardStats,
  getCustomers: mockServer.getCustomers,
  getTransactions: mockServer.getTransactionsForAdmin,
  getRiskAlerts: mockServer.getRiskAlerts,
  getAuditLogs: mockServer.getAuditLogs,
  updateComplaintStatus: mockServer.updateComplaintStatus,
  getComplaints: mockServer.getComplaints,
}
