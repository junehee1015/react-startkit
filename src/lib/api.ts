import ky from 'ky'
import { useAuthStore } from '@/features/auth/model'
import { queryClient } from './query-client'

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL || '/api'
let logoutPromise: Promise<void> | null = null
let refreshPromise: Promise<string | null> | null = null

export const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise // 토근 갱신 중이라면 그대로 return합니다.

  refreshPromise = (async () => {
    try {
      const response = await ky
        .post(`refresh`, {
          prefix: PREFIX_URL,
          credentials: 'include', // HttpOnly로 설정되어 있는 쿠키를 백엔드로 전송하기 위한 옵션
        })
        .json<{ accessToken: string }>()

      // 토큰 갱신 중 로그아웃 시 토큰이 꼬이지 않도록 에러를 던집니다.
      if (logoutPromise) throw new Error('Logout in progress')

      useAuthStore.getState().setAuthData(response.accessToken)
      return response.accessToken
    } finally {
      refreshPromise = null // 토큰 갱신 후 초기화합니다.
    }
  })()

  return refreshPromise
}

const redirectToLogin = async () => {
  try {
    const { router } = await import('@/lib/router')
    if (router.state.location.pathname !== '/login') await router.navigate({ to: '/login', replace: true })
  } catch {
    window.location.href = '/login'
  }
}

const logout = () => {
  if (logoutPromise) return logoutPromise

  logoutPromise = (async () => {
    try {
      await api.post(`logout`, { credentials: 'include' })
    } catch (error) {
      console.error('Logout API failed', error)
    } finally {
      useAuthStore.getState().clearAuthData()
      useAuthStore.persist.clearStorage()
      queryClient.clear()

      await redirectToLogin()

      logoutPromise = null
    }
  })()

  return logoutPromise
}

export const api = ky.create({
  prefix: PREFIX_URL,
  retry: 0,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const { accessToken } = useAuthStore.getState()
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
    afterResponse: [
      async ({ request, response }) => {
        const pathname = new URL(request.url).pathname
        const isAuthPath = ['/login', '/logout', '/refresh'].some((path) => pathname.endsWith(path))

        if (response.status === 401 && !isAuthPath) {
          try {
            const newToken = await refreshAccessToken()
            request.headers.set('Authorization', `Bearer ${newToken}`)
            return ky(request)
          } catch {
            await logout()
            return new Promise(() => {})
          }
        }
      },
    ],
  },
})
