import { Link } from '@tanstack/react-router'
import { LayoutDashboard, BookOpen } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

// 메뉴 설정 배열
const menuItems = [
  { title: '대시보드', url: '/dashboard', icon: LayoutDashboard },
  { title: '가이드', url: '/guide', icon: BookOpen },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-gray-900 mt-2 mb-4">React Startkit</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      to={item.url}
                      activeProps={{
                        // 활성화되었을 때 Shadcn UI 사이드바의 기본 강조 테마 적용
                        className: 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
