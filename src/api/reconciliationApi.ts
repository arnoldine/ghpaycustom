import { mockServer } from './mockServer'

export const reconciliationApi = {
  getDashboard: () => mockServer.getReconciliationDashboard(),
  runReconciliation: () => mockServer.runReconciliation(),
}
