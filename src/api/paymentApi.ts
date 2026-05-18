import type { PaymentRequest } from '../types/wallet'
import { mockServer } from './mockServer'

export const paymentApi = {
  payGhQR: (userId: string, payload: PaymentRequest) => mockServer.payGhQR(userId, payload),
  buyAirtime: (userId: string, payload: PaymentRequest) => mockServer.buyAirtime(userId, payload),
  payBill: (userId: string, payload: PaymentRequest) => mockServer.payBill(userId, payload),
}
