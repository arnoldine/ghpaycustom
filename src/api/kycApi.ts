import type { KycRequest } from '../types/kyc'
import { mockServer } from './mockServer'

export const kycApi = {
  submitKyc: (payload: KycRequest) => mockServer.submitKyc('c1', payload),
}
