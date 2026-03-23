import ky, { HTTPError } from 'ky'
import type { Options } from 'ky'
import { useAuthStore } from '@/features/auth/model'

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

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const { refreshToken, user, setAuthData } = useAuthStore.getState()
    if (!refreshToken || !user) throw new Error('No refresh token or user')

    // const response = await ky
    //   .post('refresh', {
    //     prefixUrl: import.meta.env.VITE_PREFIX_URL || 'http://localhost:8080/api',
    //     json: { refreshToken },
    //   })
    //   .json<{ accessToken: string }>()

    // setAuthData(newAccessToken, newRefreshToken, user)

    await new Promise((resolve) => setTimeout(resolve, 3000))
    const newAccessToken = 'new-access-token-' + Date.now()

    setAuthData(newAccessToken, refreshToken, user)
  } catch (error) {
    useAuthStore.getState().clearAuthData()
    useAuthStore.persist.clearStorage()
    throw error
  } finally {
    refreshPromise = null
  }
}

let refreshPromise: Promise<void> | null = null

const _request = async <T = unknown>(url: string, options: Options & { _retry?: boolean } = {}): Promise<T> => {
  try {
    return await _apiInstance(url, options).json<T>()
  } catch (e) {
    const error = e as HTTPError
    const isAuthPath = url.includes('/login') || url.includes('/refresh')

    if (error.response?.status === 401 && !options._retry && !isAuthPath) {
      if (!refreshPromise) refreshPromise = refreshAccessToken()

      try {
        await refreshPromise

        const retryOptions: Options & { _retry?: boolean } = {
          ...options,
          _retry: true,
        }

        return await _apiInstance(url, retryOptions).json<T>()
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)

        useAuthStore.getState().clearAuthData()
        useAuthStore.persist.clearStorage()

        redirectLogin()

        throw refreshError
      }
    }

    throw error
  }
}

export const request = Object.assign(_request, {
  get: <T = unknown>(url: string, options?: Options) => _request<T>(url, { ...options, method: 'get' }),
  post: <T = unknown>(url: string, options?: Options) => _request<T>(url, { ...options, method: 'post' }),
  put: <T = unknown>(url: string, options?: Options) => _request<T>(url, { ...options, method: 'put' }),
  delete: <T = unknown>(url: string, options?: Options) => _request<T>(url, { ...options, method: 'delete' }),
  patch: <T = unknown>(url: string, options?: Options) => _request<T>(url, { ...options, method: 'patch' }),
})
