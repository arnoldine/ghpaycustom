export type Role =
  | 'CUSTOMER'
  | 'ADMIN'
  | 'OPERATIONS'
  | 'COMPLIANCE'
  | 'SUPPORT'
  | 'AGENT_MANAGER'
  | 'MERCHANT_MANAGER'
  | 'AUDITOR'

export interface AuthUser {
  id: string
  fullName: string
  email: string
  phone: string
  role: Role
}

export interface AuthSession {
  token: string
  user: AuthUser
}
