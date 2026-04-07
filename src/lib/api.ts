import ky from 'ky'
import type { HTTPError, Options, Input } from 'ky'
import { useAuthStore } from '@/features/auth/model'
import { queryClient } from './query-client'

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL || '/api'
let refreshPromise: Promise<void> | null = null
let logoutPromise: Promise<void> | null = null

export const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      const response = await ky.post<{ accessToken: string }>(`refresh`, { prefix: PREFIX_URL, credentials: 'include' }).json()
      useAuthStore.getState().setAuthData(response.accessToken)
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

export const logout = () => {
  if (logoutPromise) return logoutPromise

  logoutPromise = (async () => {
    try {
      await _apiInstance.post(`logout`, { credentials: 'include' })
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

const _apiInstance = ky.create({
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
  },
})

const _api = async <T = unknown>(request: Input, options?: Options): Promise<T> => {
  const requestToPerform = request instanceof Request ? request.clone() : request

  try {
    return await _apiInstance(requestToPerform, options).json<T>()
  } catch (e) {
    const error = e as HTTPError
    const requestUrl = request instanceof Request ? request.url : request.toString()
    const isAuthPath = requestUrl.includes('/login') || requestUrl.includes('/logout') || requestUrl.includes('/refresh')

    if (error.response?.status === 401 && !isAuthPath) {
      try {
        await refreshAccessToken()
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        await logout()
        throw refreshError
      }

      const retryRequest = request instanceof Request ? request.clone() : request
      return await _apiInstance(retryRequest, options).json<T>()
    }

    throw error
  }
}

export const api = Object.assign(_api, {
  get: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'get' }),
  post: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'post' }),
  put: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'put' }),
  delete: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'delete' }),
  patch: <T = unknown>(request: Input, options?: Options) => _api<T>(request, { ...options, method: 'patch' }),
})
