import { useEffect } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'

export const Route = createFileRoute('/_public/login')({
  component: LoginPage,
})

const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
  rememberMe: z.boolean(),
})

type LoginValues = z.infer<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: '1234',
      rememberMe: false,
    },
  })

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved_email')
    if (savedEmail) {
      setValue('email', savedEmail)
      setValue('rememberMe', true)
    }
  }, [setValue])

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    try {
      await login(values)

      if (values.rememberMe) {
        localStorage.setItem('saved_email', values.email)
      } else {
        localStorage.removeItem('saved_email')
      }

      toast.success('로그인되었습니다.')
      navigate({ to: '/', replace: true })
    } catch {
      toast.error('로그인에 실패했습니다.')
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">React Startkit</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Field data-invalid={!!errors.email}>
          <FieldLabel>이메일</FieldLabel>
          <Input type="email" placeholder="admin@example.com" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel>비밀번호</FieldLabel>
          <Input type="password" placeholder="••••••••" {...register('password')} aria-invalid={!!errors.password} />
          {errors.password && <FieldError>{errors.password.message}</FieldError>}
        </Field>

        <div className="flex items-center justify-between">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <Field data-invalid={!!errors.rememberMe}>
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={field.value} onCheckedChange={field.onChange} aria-invalid={!!errors.rememberMe} />
                  <FieldLabel htmlFor="remember" className="cursor-pointer font-normal text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    아이디 기억하기
                  </FieldLabel>
                </div>
                {errors.rememberMe && <FieldError className="mt-2">{errors.rememberMe.message}</FieldError>}
              </Field>
            )}
          />

          {/* @ts-expect-error: Route not generated yet */}
          <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 whitespace-nowrap">
            비밀번호 찾기
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        계정이 없으신가요?
        {/* @ts-expect-error: Route not generated yet */}
        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
          회원가입
        </Link>
      </p>
    </div>
  )
}
