import * as React from 'react'
import ky from 'ky'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { useAuthStore } from '@/features/auth/model'
import type { queryClient } from '@/lib/query-client'
import { NotFound as notFoundComponent } from '@/components/NotFound'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GlobalModal } from '@/components/GlobalModal'

export const Route = createRootRouteWithContext<{ useAuthStore: typeof useAuthStore; queryClient: typeof queryClient }>()({
  beforeLoad: async ({ context }) => {
    const { accessToken, user, setAuthData, clearAuthData } = context.useAuthStore.getState()

    if (!accessToken && user) {
      try {
        const PREFIX_URL = import.meta.env.VITE_PREFIX_URL || '/api'
        const response = await ky.post('refresh', { prefix: PREFIX_URL, credentials: 'include' }).json<{ accessToken: string }>()
        setAuthData(response.accessToken)
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
