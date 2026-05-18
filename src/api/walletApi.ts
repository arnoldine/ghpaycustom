import { mockServer } from './mockServer'

export const walletApi = {
  getBalance: () => mockServer.getBalance(),
  getMiniStatement: () => mockServer.getMiniStatement(),
  getTransactions: () => mockServer.getTransactions(),
  getReceipt: (transactionId: string) => mockServer.getReceipt(transactionId),
  getDevices: () => mockServer.getDevices(),
  registerDevice: () => mockServer.registerDevice(),
  unlinkDevice: (deviceId: string) => mockServer.unlinkDevice('c1', deviceId),
}
