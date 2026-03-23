import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/model'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar as Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { refreshAccessToken } from '@/lib/api'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const { accessToken, user } = useAuthStore.getState()

    if (accessToken) return

    if (!user) throw redirect({ to: '/login' })

    try {
      await refreshAccessToken()
    } catch {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
  pendingComponent: AuthPendingFallback,
  errorComponent: AuthErrorFallback,
})

function AuthLayout() {
  return (
    <SidebarProvider>
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </SidebarProvider>
  )
}

function AuthPendingFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <p className="mt-4 text-sm font-medium text-gray-500">연결을 확인하고 있습니다...</p>
    </div>
  )
}

function AuthErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-red-600">시스템 오류가 발생했습니다</h2>
        <p className="mb-4 text-gray-600 text-sm">
          인증 정보를 확인하는 중 문제가 발생했습니다. <br />
          네트워크 상태를 확인하고 다시 시도해주세요.
        </p>

        <div className="mb-6 rounded bg-red-50 p-2 text-xs text-red-500">{error.message}</div>

        <div className="flex justify-center gap-3">
          <button onClick={() => reset()} className="rounded-md bg-blue-600 px-6 py-2 text-white shadow hover:bg-blue-700 transition-colors">
            다시 시도
          </button>

          <button onClick={() => window.location.reload()} className="rounded-md border border-gray-300 bg-white px-6 py-2 text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
            새로고침
          </button>
        </div>
      </div>
    </div>
  )
}
