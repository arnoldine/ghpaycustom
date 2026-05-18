import type { KycStatus } from './kyc'

export interface DeviceInfo {
  deviceId: string
  deviceName: string
  linked: boolean
  lastLogin: string
  current: boolean
}

export interface Complaint {
  id: string
  title: string
  message: string
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'ESCALATED'
  createdAt: string
  internalNote?: string
}

export interface CustomerProfile {
  id: string
  fullName: string
  phone: string
  email: string
  ghanaCardNumber: string
  address: string
  kycStatus: KycStatus
}
