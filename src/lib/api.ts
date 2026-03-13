import ky, { HTTPError } from 'ky'
import type { Options } from 'ky'
import { useAuthStore } from '@/stores/auth'

const _apiInstance = ky.create({
  prefixUrl: import.meta.env.VITE_PREFIX_URL || 'http://localhost:8080/api',
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = useAuthStore.getState().accessToken
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
  },
})

const redirectLogin = async () => {
  try {
    const { router } = await import('@/main')
    if (router.state.location.pathname !== '/login') router.navigate({ to: '/login', replace: true })
  } catch {
    location.href = '/login'
  }
}

let refreshPromise: Promise<void> | null = null

export const request = async <T = unknown>(url: string, options: Options & { _retry?: boolean } = {}): Promise<T> => {
  try {
    return await _apiInstance(url, options).json<T>()
  } catch (e) {
    const error = e as HTTPError
    const isAuthPath = url.includes('/login') || url.includes('/refresh')

    if (error.response?.status === 401 && !options._retry && !isAuthPath) {
      if (!refreshPromise) {
        refreshPromise = useAuthStore
          .getState()
          .refreshAccessToken()
          .finally(() => {
            refreshPromise = null
          })
      }

      try {
        await refreshPromise

        const retryOptions: Options & { _retry?: boolean } = {
          ...options,
          _retry: true,
        }

        return await _apiInstance(url, retryOptions).json<T>()
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)

        useAuthStore.getState().logout()

        redirectLogin()

        throw refreshError
      }
    }

    throw error
  }
}
