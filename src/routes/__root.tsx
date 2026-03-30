import * as React from 'react'
import { Outlet, createRootRouteWithContext, useNavigate } from '@tanstack/react-router'
import { GlobalModal } from '@/components/GlobalModal'
import { NotFound as notFoundComponent } from '@/components/NotFound'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useQueryClient } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth/model'
import { AUTH_EXPIRED_EVENT } from '@/lib/api'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  notFoundComponent,
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clearAuthData = useAuthStore((state) => state.clearAuthData)

  React.useEffect(() => {
    const handleAuthExpired = () => {
      clearAuthData()
      useAuthStore.persist.clearStorage()
      queryClient.clear()

      navigate({ to: '/login', replace: true })
    }

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired)

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired)
    }
  }, [navigate, queryClient, clearAuthData])

  return (
    <React.Fragment>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
      <GlobalModal />
    </React.Fragment>
  )
}
