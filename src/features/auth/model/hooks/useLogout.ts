// import { logoutApi } from '@/features/auth/api'
import { useAuthStore } from '@/features/auth/model'

export const useLogout = () => {
  const clearAuthData = useAuthStore((state) => state.clearAuthData)

  const logout = async () => {
    try {
      // await logoutApi()
    } catch (error) {
      console.warn('Backend logout failed, but clearing local data forcefully.', error)
    } finally {
      clearAuthData()
      useAuthStore.persist.clearStorage()
    }
  }

  return { logout }
}
