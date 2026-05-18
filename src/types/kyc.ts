export type KycStatus = 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'REJECTED'

export interface KycSubmission {
  fullName: string
  dateOfBirth: string
  ghanaCardNumber: string
  phoneNumber: string
  address: string
  selfiePlaceholder: string
  idImagePlaceholder: string
  consentAccepted: boolean
}
