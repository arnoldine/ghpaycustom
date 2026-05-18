import { mockServer } from './mockServer'

export const authApi = {
  login: mockServer.login,
  logout: mockServer.logout,
}
