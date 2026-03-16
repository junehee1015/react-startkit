import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { GlobalModal } from '@/components/GlobalModal'
import { NotFound as notFoundComponent } from '@/components/NotFound'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRoute({
  notFoundComponent,
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster />
      <GlobalModal />
    </React.Fragment>
  )
}
