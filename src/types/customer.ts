import type { KycStatus } from './kyc'

export interface Device {
  id: string
  name: string
  lastLogin: string
  linked: boolean
  current?: boolean
}

export interface CustomerProfile {
  id: string
  fullName: string
  phone: string
  email: string
  ghanaCard: string
  address: string
  kycStatus: KycStatus
  walletStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}
