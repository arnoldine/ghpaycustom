import type { CashTransactionRequest, TransferRequest } from '../types/wallet'
import { mockServer } from './mockServer'

export const transferApi = {
  createTransfer: (payload: TransferRequest) => mockServer.createTransfer(payload),
  cashIn: (payload: CashTransactionRequest) => mockServer.cashIn(payload),
  cashOut: (payload: CashTransactionRequest) => mockServer.cashOut(payload),
}
