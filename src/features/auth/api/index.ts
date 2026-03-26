import ky from 'ky'
import type { LoginPayload, User } from '@/features/auth/model/store'
import { api } from '@/lib/api'

interface LoginResponse {
  accessToken: string
  email: string
  user: User
}

const prefixUrl = import.meta.env.VITE_PREFIX_URL || '/api'

export const loginApi = (json: LoginPayload) => ky.post('login', { prefixUrl, json }).json<LoginResponse>()

export const logoutApi = () => api.post<void>('logout', { credentials: 'include' })
