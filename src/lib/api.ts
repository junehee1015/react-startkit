import ky from 'ky'
import { useAuthStore } from '@/features/auth/model'
import { queryClient } from './query-client'

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL || '/api'
let refreshPromise: Promise<string | null> | null = null
let logoutPromise: Promise<void> | null = null

const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      const response = await ky.post(`refresh`, { prefix: PREFIX_URL, credentials: 'include' }).json<{ accessToken: string }>()
      useAuthStore.getState().setAuthData(response.accessToken)
      return response.accessToken
    } catch {
      return null
    } finally {
      refreshPromise = null
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
          const newToken = await refreshAccessToken()

          if (newToken) {
            request.headers.set('Authorization', `Bearer ${newToken}`)
            return ky(request)
          } else {
            await logout()
            return new Promise(() => {})
          }
        }
      },
    ],
  },
})
