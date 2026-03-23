import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth/ui/LoginForm'

export const Route = createFileRoute('/_public/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">React Startkit</h1>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-gray-600">
        계정이 없으신가요?
        {/* @ts-expect-error: Route not generated yet */}
        <Link to="/signup" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
          회원가입
        </Link>
      </p>
    </div>
  )
}
