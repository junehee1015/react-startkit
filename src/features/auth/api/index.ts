// import ky from 'ky'
import type { LoginPayload, User } from '@/features/auth/model/store'
import { request } from '@/lib/api'

interface LoginResponse {
  accessToken: string
  refreshToken: string // 백엔드에서 refreshToken을 Http Only로 사용한다면 제거
  user: User
}

// export const loginApi = async (values: LoginPayload) => {
//   return ky
//     .post('login', {
//       prefixUrl: import.meta.env.VITE_PREFIX_URL || 'http://localhost:8080/api',
//       json: values,
//     })
//     .json<LoginResponse>()
// }

export const loginApi = async (body: LoginPayload): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (body.email === 'admin@example.com' && body.password === '1234') {
    return {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      user: {
        name: 'Jo Juny',
        email: body.email,
        role: 'ADMIN',
      },
    }
  } else {
    throw {
      response: {
        data: { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      },
    }
  }
}

export const logoutApi = async () => {
  return await request.post<void>('logout')
}
