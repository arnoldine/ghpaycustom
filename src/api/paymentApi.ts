import type { PaymentRequest } from '../types/transaction'
import { mockServer } from './mockServer'

export const paymentApi = {
  payGhQR: (payload: PaymentRequest) => mockServer.payGhQR(payload),
  buyAirtime: (payload: PaymentRequest) => mockServer.buyAirtime(payload),
  payBill: (payload: PaymentRequest) => mockServer.payBill(payload),
}
