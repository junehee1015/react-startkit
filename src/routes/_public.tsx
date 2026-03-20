import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/useAuthStore'

export const Route = createFileRoute('/_public')({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated()

    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  )
}
