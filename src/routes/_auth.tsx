import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar as Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated()

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthLayout,
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
