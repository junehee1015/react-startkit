import { useState } from 'react'
import { toast } from 'sonner'
import { Bell, CheckCircle, Database, HelpCircle } from 'lucide-react'
import { useConfirm } from '@/hooks/useConfirm'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

export function GuideCommon() {
  const { openConfirm, openAlert } = useConfirm()

  const handleModalTest = () => {
    openAlert({
      title: '제목',
      description: '컨텐츠 영역입니다.',
    })
  }

  const handleConfirmTest = () => {
    openConfirm({
      title: '정말 삭제하시겠습니까?',
      description: '이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.',
      confirmText: '삭제하기',
      onConfirm: () => toast.success('삭제되었습니다!'),
    })
  }

  const tableData = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 2 === 0 ? 'Admin' : 'User',
    status: i % 3 === 0 ? 'inactive' : 'active',
  }))

  // 실무용 동적 페이지네이션 로직 예시
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 // 임시로 총 5페이지로 설정

  // 간단한 페이지 번호 배열 생성 로직 (1, 2, 3, 4, 5)
  const generatePaginationItems = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const sections = ['actions', 'forms', 'layout', 'data', 'navigation', 'feedback']

  return (
    <div className="relative flex items-start gap-12">
      <div className="min-w-0 flex-1 space-y-24 pb-32">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shadcn UI 컴포넌트 가이드</h2>
          <p className="my-3 text-lg leading-relaxed text-gray-600">
            Base 래퍼 컴포넌트 없이 <strong>Shadcn UI</strong> 네이티브 컴포넌트를 직접 사용합니다.
            <br />
            아래 Usage의 코드를 복사하여 컴포넌트에 바로 적용하세요.
          </p>
        </div>

        {/* --- 1. Actions --- */}
        <section id="actions" className="scroll-mt-24 space-y-6">
          <h3 className="border-b pb-4 text-2xl font-bold text-gray-900">Actions</h3>
          <div className="space-y-4">
            <div className="space-y-4 rounded-xl border bg-white p-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Preview</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Danger</Button>
                <div className="mx-2 h-8 w-px bg-gray-200" />
                <Button disabled>Disabled</Button>
              </div>
            </div>
            <CodeBlock htmlCode={actionsCode} />
          </div>
        </section>

        {/* --- 2. Forms --- */}
        <section id="forms" className="scroll-mt-24 space-y-6">
          <h3 className="border-b pb-4 text-2xl font-bold text-gray-900">Form Inputs</h3>
          <div className="space-y-4">
            <div className="space-y-6 rounded-xl border bg-white p-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Preview</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>이메일</Label>
                  <Input placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <Label>사용자 역할</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="역할을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">관리자 (Admin)</SelectItem>
                      <SelectItem value="manager">매니저 (Manager)</SelectItem>
                      <SelectItem value="user">일반 사용자 (User)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>자기소개</Label>
                <Textarea placeholder="최대 100자까지 입력 가능합니다." />
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications" />
                  <Label htmlFor="notifications">알림 받기</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="marketing" />
                  <Label htmlFor="marketing">마케팅 정보 수신</Label>
                </div>
              </div>
            </div>
            <CodeBlock htmlCode={formsCode} />
          </div>
        </section>

        {/* --- 3. Layout --- */}
        <section id="layout" className="scroll-mt-24 space-y-6">
          <h3 className="border-b pb-4 text-2xl font-bold text-gray-900">Layout & Containers</h3>
          <div className="space-y-4">
            <div className="space-y-6 rounded-xl border bg-white p-6">
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">계정 설정</TabsTrigger>
                  <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>계정 정보</CardTitle>
                      <CardDescription>프로필 정보를 수정합니다.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Label>닉네임</Label>
                      <Input defaultValue="Juny Jo" />
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button>저장하기</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  <Card className="p-6 text-gray-500">비밀번호 변경 탭 내용...</Card>
                </TabsContent>
              </Tabs>
            </div>
            <CodeBlock htmlCode={layoutCode} />
          </div>
        </section>

        {/* --- 4. Data Display --- */}
        <section id="data" className="scroll-mt-24 space-y-6">
          <h3 className="border-b pb-4 text-2xl font-bold text-gray-900">Data Display</h3>
          <div className="space-y-4">
            <div className="space-y-6 rounded-xl border bg-white p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="mt-8 overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>이메일</TableHead>
                      <TableHead>권한</TableHead>
                      <TableHead>상태</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                          <Badge variant={row.status === 'active' ? 'default' : 'secondary'}>{row.status === 'active' ? 'Active' : 'Inactive'}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <CodeBlock htmlCode={dataCode} />
          </div>
        </section>

        {/* --- 5. Navigation --- */}
        <section id="navigation" className="scroll-mt-24 space-y-6">
          <h3 className="border-b pb-4 text-2xl font-bold text-gray-900">Navigation</h3>
          <div className="space-y-4">
            <div className="space-y-6 rounded-xl border bg-white p-6">
              {/* 동적 페이지네이션 적용 */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-700">Pagination</h4>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                    </PaginationItem>

                    {generatePaginationItems().map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page} className="cursor-pointer">
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-sm font-bold text-gray-700">Accordion</h4>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        스타트킷의 목적은 무엇인가요?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>반복되는 초기 세팅 시간을 줄이고 일관된 아키텍처를 제공하기 위함입니다.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        상태 관리는 어떻게 하나요?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>Zustand를 사용하여 전역 상태를 관리하며, 서버 데이터는 TanStack Query를 권장합니다.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <CodeBlock htmlCode={navigationCode} />
          </div>
        </section>

        {/* --- 6. Feedback & Overlays --- */}
        <section id="feedback" className="scroll-mt-24 space-y-6">
          <h3 className="border-b pb-4 text-2xl font-bold text-gray-900">Feedback & Overlays</h3>
          <div className="space-y-4">
            <div className="space-y-4 rounded-xl border bg-white p-6">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" onClick={handleModalTest}>
                  Modal Hook
                </Button>
                <Button variant="destructive" onClick={handleConfirmTest}>
                  Confirm Hook
                </Button>
                <Button variant="outline" onClick={() => toast.success('저장 완료!')}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Success Toast
                </Button>

                {/* 툴팁 컴포넌트 렌더링 */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>알림 설정으로 이동합니다</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CodeBlock htmlCode={feedbackCode} />
          </div>
        </section>
      </div>

      {/* --- 우측 사이드바 (TOC) --- */}
      <aside className="hidden w-64 shrink-0 2xl:block">
        <div className="sticky top-24">
          <h4 className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-900">Contents</h4>
          <nav className="space-y-1">
            {sections.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="block w-full rounded-md px-4 py-2 text-left text-sm capitalize text-gray-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                {item}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}

function CodeBlock({ htmlCode }: { htmlCode: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#1e1e1e] font-mono text-[13px] shadow-xl">
      <div className="flex items-center border-b border-gray-800 bg-[#252526] px-4 py-2 text-gray-400">Usage (Copy & Paste)</div>
      <pre className="overflow-x-auto p-4 leading-relaxed text-[#d4d4d4]" dangerouslySetInnerHTML={{ __html: htmlCode }} />
    </div>
  )
}

// ----------------------------------------------------------------------------
// 코드 스니펫 HTML 상수 (VS Code 렌더링 완벽 싱크로율)
// ----------------------------------------------------------------------------

const actionsCode = `
<span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex flex-wrap items-center gap-3"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>Primary<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"outline"</span><span style="color:#808080">&gt;</span>Outline<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"ghost"</span><span style="color:#808080">&gt;</span>Ghost<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"destructive"</span><span style="color:#808080">&gt;</span>Danger<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"mx-2 h-8 w-px bg-gray-200"</span> <span style="color:#808080">/&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">disabled</span><span style="color:#808080">&gt;</span>Disabled<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>`.trim()

const formsCode = `
<span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"grid grid-cols-1 gap-6 md:grid-cols-2"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"space-y-2"</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Label</span><span style="color:#808080">&gt;</span>이메일<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Label</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Input</span> <span style="color:#9cdcfe">placeholder</span>=<span style="color:#ce9178">"example@email.com"</span> <span style="color:#808080">/&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"space-y-2"</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Label</span><span style="color:#808080">&gt;</span>사용자 역할<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Label</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Select</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">SelectTrigger</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">SelectValue</span> <span style="color:#9cdcfe">placeholder</span>=<span style="color:#ce9178">"역할을 선택하세요"</span> <span style="color:#808080">/&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">SelectTrigger</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">SelectContent</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">SelectItem</span> <span style="color:#9cdcfe">value</span>=<span style="color:#ce9178">"admin"</span><span style="color:#808080">&gt;</span>관리자 (Admin)<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">SelectItem</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">SelectItem</span> <span style="color:#9cdcfe">value</span>=<span style="color:#ce9178">"user"</span><span style="color:#808080">&gt;</span>일반 사용자 (User)<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">SelectItem</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">SelectContent</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Select</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>

<span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"space-y-4 pt-2"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex items-center space-x-2"</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Checkbox</span> <span style="color:#9cdcfe">id</span>=<span style="color:#ce9178">"notifications"</span> <span style="color:#808080">/&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Label</span> <span style="color:#9cdcfe">htmlFor</span>=<span style="color:#ce9178">"notifications"</span><span style="color:#808080">&gt;</span>알림 받기<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Label</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>`.trim()

const layoutCode = `
<span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Tabs</span> <span style="color:#9cdcfe">defaultValue</span>=<span style="color:#ce9178">"account"</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"w-full"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TabsList</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TabsTrigger</span> <span style="color:#9cdcfe">value</span>=<span style="color:#ce9178">"account"</span><span style="color:#808080">&gt;</span>계정 설정<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TabsTrigger</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TabsTrigger</span> <span style="color:#9cdcfe">value</span>=<span style="color:#ce9178">"password"</span><span style="color:#808080">&gt;</span>비밀번호 변경<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TabsTrigger</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TabsList</span><span style="color:#808080">&gt;</span>

  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TabsContent</span> <span style="color:#9cdcfe">value</span>=<span style="color:#ce9178">"account"</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Card</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">CardHeader</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">CardTitle</span><span style="color:#808080">&gt;</span>계정 정보<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">CardTitle</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">CardDescription</span><span style="color:#808080">&gt;</span>프로필을 수정합니다.<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">CardDescription</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">CardHeader</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">CardContent</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Input</span> <span style="color:#9cdcfe">defaultValue</span>=<span style="color:#ce9178">"Juny Jo"</span> <span style="color:#808080">/&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">CardContent</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">CardFooter</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>저장하기<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">CardFooter</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Card</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TabsContent</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Tabs</span><span style="color:#808080">&gt;</span>`.trim()

const dataCode = `
<span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex flex-wrap gap-2"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Badge</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"default"</span><span style="color:#808080">&gt;</span>Default<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Badge</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Badge</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"secondary"</span><span style="color:#808080">&gt;</span>Secondary<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Badge</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Badge</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"outline"</span><span style="color:#808080">&gt;</span>Outline<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Badge</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Badge</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"destructive"</span><span style="color:#808080">&gt;</span>Destructive<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Badge</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>

<span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Table</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableHeader</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableRow</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableHead</span><span style="color:#808080">&gt;</span>이름<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableHead</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableHead</span><span style="color:#808080">&gt;</span>이메일<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableHead</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableRow</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableHeader</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableBody</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableRow</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableCell</span><span style="color:#808080">&gt;</span>User 1<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableCell</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TableCell</span><span style="color:#808080">&gt;</span>user1@example.com<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableCell</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableRow</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TableBody</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Table</span><span style="color:#808080">&gt;</span>`.trim()

const navigationCode = `
<span style="color:#6a9955">// Pagination Logic</span>
<span style="color:#569cd6">const</span> [<span style="color:#4fc1ff">currentPage</span>, <span style="color:#dcdcaa">setCurrentPage</span>] = <span style="color:#dcdcaa">useState</span>(<span style="color:#b5cea8">1</span>)
<span style="color:#569cd6">const</span> <span style="color:#4fc1ff">totalPages</span> = <span style="color:#b5cea8">5</span>
<span style="color:#569cd6">const</span> <span style="color:#dcdcaa">generatePaginationItems</span> = () <span style="color:#569cd6">=&gt;</span> <span style="color:#4ec9b0">Array</span>.<span style="color:#dcdcaa">from</span>({ <span style="color:#9cdcfe">length</span>: <span style="color:#9cdcfe">totalPages</span> }, (<span style="color:#9cdcfe">_</span>, <span style="color:#9cdcfe">i</span>) <span style="color:#569cd6">=&gt;</span> <span style="color:#9cdcfe">i</span> + <span style="color:#b5cea8">1</span>)

<span style="color:#6a9955">{/* Pagination UI */}</span>
<span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Pagination</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationContent</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationItem</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationPrevious</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">setCurrentPage</span>(<span style="color:#9cdcfe">p</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#4ec9b0">Math</span>.<span style="color:#dcdcaa">max</span>(<span style="color:#b5cea8">1</span>, <span style="color:#9cdcfe">p</span> - <span style="color:#b5cea8">1</span>))} <span style="color:#808080">/&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">PaginationItem</span><span style="color:#808080">&gt;</span>
    
    {<span style="color:#dcdcaa">generatePaginationItems</span>().<span style="color:#dcdcaa">map</span>(<span style="color:#9cdcfe">page</span> <span style="color:#569cd6">=&gt;</span> (
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationItem</span> <span style="color:#9cdcfe">key</span>={<span style="color:#9cdcfe">page</span>}<span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationLink</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">setCurrentPage</span>(<span style="color:#9cdcfe">page</span>)} <span style="color:#9cdcfe">isActive</span>={<span style="color:#9cdcfe">currentPage</span> === <span style="color:#9cdcfe">page</span>}<span style="color:#808080">&gt;</span>
          {<span style="color:#9cdcfe">page</span>}
        <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">PaginationLink</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">PaginationItem</span><span style="color:#808080">&gt;</span>
    ))}

    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationItem</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">PaginationNext</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">setCurrentPage</span>(<span style="color:#9cdcfe">p</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#4ec9b0">Math</span>.<span style="color:#dcdcaa">min</span>(<span style="color:#9cdcfe">totalPages</span>, <span style="color:#9cdcfe">p</span> + <span style="color:#b5cea8">1</span>))} <span style="color:#808080">/&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">PaginationItem</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">PaginationContent</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Pagination</span><span style="color:#808080">&gt;</span>

<span style="color:#6a9955">{/* Accordion UI */}</span>
<span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Accordion</span> <span style="color:#9cdcfe">type</span>=<span style="color:#ce9178">"single"</span> <span style="color:#9cdcfe">collapsible</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"w-full"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">AccordionItem</span> <span style="color:#9cdcfe">value</span>=<span style="color:#ce9178">"item-1"</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">AccordionTrigger</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex items-center gap-2"</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">HelpCircle</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"h-4 w-4"</span> <span style="color:#808080">/&gt;</span>
        스타트킷의 목적은 무엇인가요?
      <span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">AccordionTrigger</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">AccordionContent</span><span style="color:#808080">&gt;</span>
      반복되는 초기 세팅 시간을 줄이고 일관된 아키텍처를 제공하기 위함입니다.
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">AccordionContent</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">AccordionItem</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Accordion</span><span style="color:#808080">&gt;</span>`.trim()

const feedbackCode = `
<span style="color:#6a9955">// Hook Logic</span>
<span style="color:#569cd6">const</span> { <span style="color:#4fc1ff">openConfirm</span>, <span style="color:#4fc1ff">openAlert</span> } = <span style="color:#dcdcaa">useConfirm</span>()

<span style="color:#569cd6">const</span> <span style="color:#dcdcaa">handleModalTest</span> = () <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#dcdcaa">openAlert</span>({ <span style="color:#9cdcfe">title</span>: <span style="color:#ce9178">'제목'</span>, <span style="color:#9cdcfe">description</span>: <span style="color:#ce9178">'컨텐츠 영역입니다.'</span> })
}
<span style="color:#569cd6">const</span> <span style="color:#dcdcaa">handleConfirmTest</span> = () <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#dcdcaa">openConfirm</span>({
    <span style="color:#9cdcfe">title</span>: <span style="color:#ce9178">'정말 삭제하시겠습니까?'</span>,
    <span style="color:#9cdcfe">description</span>: <span style="color:#ce9178">'영구적으로 삭제됩니다.'</span>,
    <span style="color:#9cdcfe">confirmText</span>: <span style="color:#ce9178">'삭제하기'</span>,
    <span style="color:#dcdcaa">onConfirm</span>: () <span style="color:#569cd6">=&gt;</span> <span style="color:#9cdcfe">toast</span>.<span style="color:#dcdcaa">success</span>(<span style="color:#ce9178">'삭제되었습니다!'</span>),
  })
}

<span style="color:#6a9955">// UI Components</span>
<span style="color:#808080">&lt;</span><span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex flex-wrap items-center gap-4"</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"outline"</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">handleModalTest</span>}<span style="color:#808080">&gt;</span>
    Modal Hook
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"destructive"</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">handleConfirmTest</span>}<span style="color:#808080">&gt;</span>
    Confirm Hook
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"outline"</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#9cdcfe">toast</span>.<span style="color:#dcdcaa">success</span>(<span style="color:#ce9178">'저장 완료!'</span>)}<span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">CheckCircle</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"mr-2 h-4 w-4 text-green-500"</span> <span style="color:#808080">/&gt;</span> Success Toast
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TooltipProvider</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Tooltip</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TooltipTrigger</span> <span style="color:#9cdcfe">asChild</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Button</span> <span style="color:#9cdcfe">variant</span>=<span style="color:#ce9178">"ghost"</span> <span style="color:#9cdcfe">size</span>=<span style="color:#ce9178">"icon"</span><span style="color:#808080">&gt;</span>
          <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">Bell</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"h-4 w-4"</span> <span style="color:#808080">/&gt;</span>
        <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Button</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TooltipTrigger</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;</span><span style="color:#4ec9b0">TooltipContent</span><span style="color:#808080">&gt;</span>
        <span style="color:#808080">&lt;</span><span style="color:#569cd6">p</span><span style="color:#808080">&gt;</span>알림 설정으로 이동합니다<span style="color:#808080">&lt;/</span><span style="color:#569cd6">p</span><span style="color:#808080">&gt;</span>
      <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TooltipContent</span><span style="color:#808080">&gt;</span>
    <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">Tooltip</span><span style="color:#808080">&gt;</span>
  <span style="color:#808080">&lt;/</span><span style="color:#4ec9b0">TooltipProvider</span><span style="color:#808080">&gt;</span>
<span style="color:#808080">&lt;/</span><span style="color:#569cd6">div</span><span style="color:#808080">&gt;</span>`.trim()
