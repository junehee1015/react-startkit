import ky from 'ky'
import type { HTTPError, Options, Input } from 'ky'
import { useAuthStore } from '@/features/auth/model'

export const AUTH_EXPIRED_EVENT = 'auth:expired'

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL || '/api'
let refreshPromise: Promise<void> | null = null
let logoutPromise: Promise<void> | null = null

export const logout = () => {
  if (logoutPromise) return logoutPromise

  logoutPromise = (async () => {
    try {
      await ky.post(`logout`, { prefixUrl: PREFIX_URL, credentials: 'include' })
    } catch (error) {
      console.error('Logout API failed, but forcing local logout', error)
    } finally {
      logoutPromise = null
    }
  })()

  return logoutPromise
}

export const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      const response = await ky.post<{ accessToken: string }>(`refresh`, { prefixUrl: PREFIX_URL, credentials: 'include' }).json()
      useAuthStore.getState().setAuthData(response.accessToken)
    } catch (error) {
      await logout()
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT))
      throw error
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

const _apiInstance = ky.create({
  prefixUrl: PREFIX_URL,
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
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
    const isAuthPath = requestUrl.includes('/login') || requestUrl.includes('/refresh')

    if (error.response?.status === 401 && !isAuthPath) {
      await refreshAccessToken()

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
