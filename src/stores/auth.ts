import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  name: string
  email: string
  role: string
}

export interface LoginPayload {
  email: string
  password: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: () => boolean
  login: (values: LoginPayload) => Promise<void>
  refreshAccessToken: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      isAuthenticated: () => !!get().accessToken,

      login: async (values: LoginPayload) => {
        // API 지연 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (values.email !== 'admin@example.com' || values.password !== '1234') {
          throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
        }

        set({
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: { name: 'Juny Jo', email: values.email, role: 'Admin' },
        })
      },

      refreshAccessToken: async () => {
        try {
          const refreshToken = get().refreshToken

          if (!refreshToken) throw new Error('No refresh token')

          // const response = await ky
          //   .post('refresh', {
          //     prefixUrl: import.meta.env.VITE_PREFIX_URL || 'http://localhost:8080/api',
          //     json: { refreshToken },
          //   })
          //   .json<{ accessToken: string }>()

          // API 지연 시뮬레이션, 실제 API 호출 시 순수 인스턴스로 호출해야 함.
          await new Promise((resolve) => setTimeout(resolve, 300))

          set({ accessToken: 'new-access-token-' + Date.now() })
        } catch (error) {
          get().logout()
          throw error
        }
      },

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null })
        useAuthStore.persist.clearStorage()
      },
    }),
    {
      name: 'auth',
    },
  ),
)
