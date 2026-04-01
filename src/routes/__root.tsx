import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { GlobalModal } from '@/components/GlobalModal'
import { NotFound as notFoundComponent } from '@/components/NotFound'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createRootRoute({
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
