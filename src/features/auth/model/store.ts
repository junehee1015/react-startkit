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
  user?: User | null
  accessToken: string | null
  setAuthData: (accessToken: string, user?: User) => void
  clearAuthData: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      setAuthData: (accessToken, user = get().user) => set({ accessToken, user }),

      clearAuthData: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
