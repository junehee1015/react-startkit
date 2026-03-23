import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
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
  setAuthData: (accessToken: string, refreshToken: string, user: User) => void // 백엔드에서 refreshToken을 Http Only로 사용한다면 제거
  clearAuthData: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null, // 백엔드에서 refreshToken을 Http Only로 사용한다면 제거

      setAuthData: (accessToken, refreshToken, user) => set({ accessToken, refreshToken, user }),

      clearAuthData: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user, refreshToken: state.refreshToken }), // 백엔드에서 refreshToken을 Http Only로 사용한다면 제거
    },
  ),
)
