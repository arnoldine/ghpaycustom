import type { KycSubmission } from '../types/kyc'
import { mockServer } from './mockServer'

export const kycApi = {
  submitKyc: (payload: KycSubmission) => mockServer.submitKyc(payload),
}
