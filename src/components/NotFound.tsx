import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-lg text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
      <Button asChild>
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
