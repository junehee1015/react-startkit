import ky from 'ky'
import type { LoginPayload, User } from '../model/store'

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export const loginApi = async (values: LoginPayload) => {
  return ky
    .post('login', {
      prefixUrl: import.meta.env.VITE_PREFIX_URL || 'http://localhost:8080/api',
      json: values,
    })
    .json<LoginResponse>()
}

export const logoutApi = async () => {
  return await ky.post('logout', {
    prefixUrl: import.meta.env.VITE_PREFIX_URL || 'http://localhost:8080/api',
    method: 'POST',
  })
}
