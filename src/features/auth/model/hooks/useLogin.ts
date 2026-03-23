// import { loginApi } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/model'
import type { LoginPayload } from '@/features/auth/model/store'

export const useLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData)

  const login = async (values: LoginPayload) => {
    try {
      // const response = await loginApi(values)
      // setAuthData(response.accessToken, response.refreshToken, response.user)

      await new Promise((resolve) => setTimeout(resolve, 500))

      if (values.email !== 'admin@example.com' || values.password !== '1234') {
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
      }

      setAuthData('mock-access-token-' + Date.now(), 'mock-refresh-token-' + Date.now(), { name: 'Juny Jo', email: values.email, role: 'Admin' })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  return { login }
}
