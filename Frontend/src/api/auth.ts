import { apiClient } from './apiClient'

export interface LoginPayload {
  emailOrName?: string
  username?: string
  email?: string
  password: string
}

export const loginRequest = async (credentials: LoginPayload) => {
  const value = credentials.emailOrName || credentials.username || credentials.email || ''

  const payload = {
    emailOrName: value,
    username: value,
    email: value,
    password: credentials.password,
  }

  const response = await apiClient.post('/auth/login', payload)
  return response.data
}