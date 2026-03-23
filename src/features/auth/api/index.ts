import ky from 'ky'
import type { LoginPayload, User } from '@/features/auth/model/store'
import { request } from '@/lib/api'

interface LoginResponse {
  accessToken: string
  refreshToken: string // 백엔드에서 refreshToken을 Http Only로 사용한다면 제거
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
  return await request.post<void>('logout')
}
