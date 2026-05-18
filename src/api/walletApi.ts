import { mockServer } from './mockServer'

export const walletApi = {
  getBalance: mockServer.getBalance,
  getMiniStatement: mockServer.getMiniStatement,
  getTransactions: mockServer.getTransactions,
}
