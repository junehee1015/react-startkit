import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import { useAuthStore } from '@/features/auth/model'
import { queryClient } from '@/lib/query-client'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface StaticDataRouteOption {
    breadcrumb?: string
  }
}

export const router = createRouter({ routeTree, context: { useAuthStore, queryClient } })
