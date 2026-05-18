export type KycStatus = 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'REJECTED'

export interface KycRequest {
  fullName: string
  dateOfBirth: string
  ghanaCardNumber: string
  phoneNumber: string
  address: string
  selfiePlaceholder: string
  idImagePlaceholder: string
}
