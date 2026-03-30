import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import './index.css'
import { Toaster } from 'sonner'
import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface StaticDataRouteOption {
    breadcrumb?: string
  }
}

export const router = createRouter({ routeTree, context: { queryClient } })

const enableMocking = async () => {
  if (import.meta.env.VITE_ENABLE_MSW !== 'true') return
  if (import.meta.env.PROD) return

  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

const rootElement = document.getElementById('root')!

const initApp = async () => {
  if (!rootElement.innerHTML) {
    await enableMocking()

    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </QueryClientProvider>
      </StrictMode>,
    )
  }
}

initApp()
