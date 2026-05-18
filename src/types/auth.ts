export type Role =
  | 'CUSTOMER'
  | 'ADMIN'
  | 'OPERATIONS'
  | 'COMPLIANCE'
  | 'SUPPORT'
  | 'AGENT_MANAGER'
  | 'MERCHANT_MANAGER'
  | 'AUDITOR'

export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  role: Role
  customerId?: string
}

export interface AuthSession {
  token: string
  expiresAt: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}
