import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분
      retry: 1, // 실패 시 기본 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리패치 비활성화
    },
  },
})
