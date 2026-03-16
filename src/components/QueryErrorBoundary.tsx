import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

interface QueryErrorBoundaryProps {
  children: React.ReactNode
  FallbackComponent?: React.ComponentType<FallbackProps>
}

const DefaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-red-50 rounded-lg border border-red-100 w-full">
      <h3 className="text-lg font-bold text-red-600 mb-2">데이터를 불러오지 못했습니다</h3>
      <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
      <button onClick={resetErrorBoundary} className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors text-sm font-medium">
        다시 시도
      </button>
    </div>
  )
}

export function QueryErrorBoundary({ children, FallbackComponent }: QueryErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent || DefaultErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}
