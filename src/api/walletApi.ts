import { mockServer } from './mockServer'

export const walletApi = {
  getBalance: (customerId?: string) => mockServer.getBalance(customerId),
  getMiniStatement: (customerId?: string) => mockServer.getMiniStatement(customerId),
  getTransactions: (customerId?: string) => mockServer.getTransactions(customerId),
  getReceipt: (transactionId: string) => mockServer.getReceipt(transactionId),
  getDevices: (customerId?: string) => mockServer.getDevices(customerId),
  registerDevice: (customerId?: string) => mockServer.registerDevice(customerId),
  unlinkDevice: (deviceId: string, customerId = 'c1') => mockServer.unlinkDevice(customerId, deviceId),
}
