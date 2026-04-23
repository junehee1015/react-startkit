import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { useAuthStore } from '@/features/auth/model'
import type { queryClient } from '@/lib/query-client'
import { NotFound as notFoundComponent } from '@/components/NotFound'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GlobalModal } from '@/components/GlobalModal'
import { refreshAccessToken } from '@/lib/api'

export const Route = createRootRouteWithContext<{ useAuthStore: typeof useAuthStore; queryClient: typeof queryClient }>()({
  beforeLoad: async ({ context }) => {
    const { accessToken, user, clearAuthData } = context.useAuthStore.getState()

    if (!accessToken && user) {
      try {
        await refreshAccessToken()
      } catch {
        clearAuthData()
        context.queryClient.clear()
      }
    }
  },
  notFoundComponent,
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
      <GlobalModal />
    </React.Fragment>
  )
}
