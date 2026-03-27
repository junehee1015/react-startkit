import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  // 전역 에러 처리
  // queryCache: new QueryCache({
  //   onError: (error, query) => {
  //     toast.error(error)
  //   },
  // }),
  // mutationCache: new MutationCache({
  //   onError: () => {
  //     toast.error(error)
  //   },
  // }),
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 1000 * 60 * 10, // 10분
      retry: 1, // 실패 시 기본 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리패치 비활성화
    },
  },
})
