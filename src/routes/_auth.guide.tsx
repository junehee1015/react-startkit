import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GuideRouting } from '@/features/guide/components/GuideRouting'
import { GuideApi } from '@/features/guide/components/GuideApi'
import { GuideCommon } from '@/features/guide/components/GuideCommon'

export const Route = createFileRoute('/_auth/guide')({
  staticData: {
    breadcrumb: '사용자 가이드',
  },
  component: GuidePage,
})

function GuidePage() {
  useEffect(() => {
    document.title = '사용자 가이드 | React Startkit'
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">사용자 가이드</h1>
        <p className="mt-2 text-gray-600">React-Startkit의 핵심 기능과 개발 규칙을 확인하는 공간입니다.</p>
      </div>

      <Tabs defaultValue="routing" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="routing">라우팅 규칙</TabsTrigger>
          <TabsTrigger value="api">API & 상태관리</TabsTrigger>
          <TabsTrigger value="common">공통 컴포넌트</TabsTrigger>
        </TabsList>

        <TabsContent value="routing">
          <div className="py-6">
            <GuideRouting />
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="py-6">
            <GuideApi />
          </div>
        </TabsContent>

        <TabsContent value="common">
          <div className="py-6">
            <GuideCommon />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
