import type { TransferRequest } from '../types/wallet'
import { mockServer } from './mockServer'

export const transferApi = {
  createTransfer: (userId: string, payload: TransferRequest) => mockServer.createTransfer(userId, payload),
  cashService: mockServer.cashService,
}
