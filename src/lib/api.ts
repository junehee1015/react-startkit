import ky from 'ky'
import type { HTTPError, Options } from 'ky'
import { useAuthStore } from '@/features/auth/model'

const PREFIX_URL = import.meta.env.VITE_PREFIX_URL || '/api'
let refreshPromise: Promise<void> | null = null
let logoutPromise: Promise<void> | null = null

export const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    const { setAuthData } = useAuthStore.getState()

    try {
      const response = await ky
        .post<{ accessToken: string }>(`refresh`, {
          prefixUrl: PREFIX_URL,
          credentials: 'include',
        })
        .json()

      setAuthData(response.accessToken)
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

export const logout = () => {
  if (logoutPromise) return logoutPromise

  logoutPromise = (async () => {
    try {
      await ky.post(`logout`, {
        prefixUrl: PREFIX_URL,
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout API failed, but forcing local logout', error)
    } finally {
      useAuthStore.getState().clearAuthData()
      useAuthStore.persist.clearStorage()

      logoutPromise = null
    }
  })()

  return logoutPromise
}

const redirectToLogin = async () => {
  try {
    const { router } = await import('./router')
    if (router.state.location.pathname !== '/login') router.navigate({ to: '/login', replace: true })
  } catch {
    location.href = '/login'
  }
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

const _api = async <T = unknown>(url: string, options: Options): Promise<T> => {
  try {
    return await _apiInstance(url, options).json<T>()
  } catch (e) {
    const error = e as HTTPError
    const isAuthPath = url.includes('/login') || url.includes('/refresh')

    if (error.response?.status === 401 && !isAuthPath) {
      try {
        await refreshAccessToken()
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)

        await logout()
        await redirectToLogin()

        throw refreshError
      }

      return await _apiInstance(url, options).json<T>()
    }

    throw error
  }
}

export const api = Object.assign(_api, {
  get: <T = unknown>(url: string, options?: Options) => _api<T>(url, { ...options, method: 'get' }),
  post: <T = unknown>(url: string, options?: Options) => _api<T>(url, { ...options, method: 'post' }),
  put: <T = unknown>(url: string, options?: Options) => _api<T>(url, { ...options, method: 'put' }),
  delete: <T = unknown>(url: string, options?: Options) => _api<T>(url, { ...options, method: 'delete' }),
  patch: <T = unknown>(url: string, options?: Options) => _api<T>(url, { ...options, method: 'patch' }),
})
