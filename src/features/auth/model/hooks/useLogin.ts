import { useMutation } from '@tanstack/react-query'
import { loginApi } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/model'
import type { LoginPayload } from '@/features/auth/model/store'

export const useLogin = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData)

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (data) => setAuthData(data.accessToken, data.user),
    onError: (error) => console.error('Login failed:', error),
  })
}
