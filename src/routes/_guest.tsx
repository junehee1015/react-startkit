import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/model'

export const Route = createFileRoute('/_guest')({
  beforeLoad: () => {
    const isAuthenticated = !!useAuthStore.getState().accessToken
    const isUser = !!useAuthStore.getState().user

    if (isAuthenticated || isUser) {
      throw redirect({ to: '/' })
    }
  },
  component: GuestLayout,
})

function GuestLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  )
}
