import { Fragment } from 'react'
import { Link, useMatches, useNavigate } from '@tanstack/react-router'
import { Home, ChevronRight, User, Settings, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useConfirm } from '@/hooks/useConfirm'
import { useAuthStore, useLogout } from '@/features/auth/model'

export function Header() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { mutate: logout, isPending } = useLogout()
  const { openConfirm } = useConfirm()

  const matches = useMatches()

  const breadcrumbs = matches
    .filter((match) => match.staticData?.breadcrumb)
    .map((match) => ({
      label: match.staticData.breadcrumb as string,
      to: match.pathname,
    }))

  const handleLogout = () => {
    openConfirm({
      title: '로그아웃 하시겠습니까?',
      cancelText: '취소',
      confirmText: '확인',
      onConfirm: () => {
        logout(undefined, {
          onSettled: () => {
            navigate({ to: '/login', replace: true })
            toast.error('로그아웃 되었습니다.')
          },
        })
      },
    })
  }

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'US'

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-6">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home />
                </Link>
              </BreadcrumbLink>
              <ChevronRight />
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <Fragment key={crumb.to}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.to}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="flex w-auto min-w-32 flex-nowrap cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-left outline-none transition-colors hover:bg-gray-100 data-[state=open]:bg-gray-100">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{userInitials}</div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium leading-none text-gray-700">{user?.name || '사용자'}</span>
                  <span className="mt-0.5 text-[10px] leading-none text-gray-400">{user?.role || 'Guest'}</span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert('Profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>프로필</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>설정</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* danger 스타일 적용 */}
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {isPending && (
        <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-gray-600">로그아웃 처리 중입니다...</p>
        </div>
      )}
    </>
  )
}
