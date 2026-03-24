import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth/model'
import { logoutApi } from '@/features/auth/api'

export const useLogout = () => {
  const clearAuthData = useAuthStore((state) => state.clearAuthData)

  return useMutation({
    mutationFn: logoutApi,
    onError: (error) => console.warn('Backend logout failed, but clearing local data forcefully.', error),
    onSettled: () => {
      clearAuthData()
      useAuthStore.persist.clearStorage()
    },
  })
}
