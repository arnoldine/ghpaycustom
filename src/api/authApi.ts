import type { LoginRequest } from '../types/auth'
import { mockServer } from './mockServer'

export const authApi = {
  login: (payload: LoginRequest) => mockServer.login(payload),
  logout: () => mockServer.logout(),
}
