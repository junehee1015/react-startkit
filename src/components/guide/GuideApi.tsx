// src/components/guide/GuideApi.tsx

export function GuideApi() {
  return (
    <div className="max-w-5xl space-y-12 pb-32">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">API & Data Fetching 아키텍처</h2>
        <p className="mt-4 text-mg text-gray-600 leading-relaxed">
          본 스타트킷은 <strong>Key Factory Pattern</strong>과 <strong>Custom Hook 코로케이션(Co-location)</strong>을 통해 비즈니스 로직을 분리합니다.
          <br />
          특히 UI의 중요도에 따라 <strong>선언적 방식(ErrorBoundary 사용)</strong>과 <strong>명령형 방식(미사용)</strong>을 유연하게 선택하는 것을 지향합니다.
        </p>
      </div>

      {/* --- STEP 1 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 1</span>
          <h3 className="text-xl font-bold text-gray-800">API 통신 정의 (api/ 디렉토리)</h3>
        </div>
        <p className="text-sm text-gray-600">이 계층은 오직 네트워크 요청만 담당합니다. ky 인스턴스를 활용하여 순수 함수로 작성합니다.</p>
        <CodeBlock filename="src/api/users.ts" htmlCode={step1Code} />
      </section>

      {/* --- STEP 2 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 2</span>
          <h3 className="text-xl font-bold text-gray-800">Query & Mutation 커스텀 훅 (hooks/queries/)</h3>
        </div>
        <p className="text-sm text-gray-600">
          캐시 키(Key Factory)와 비즈니스 로직을 <strong>함께(Co-location)</strong> 모아둡니다.
        </p>
        <CodeBlock filename="src/hooks/queries/useUsers.ts" htmlCode={step2Code} />
      </section>

      {/* --- STEP 3 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700">STEP 3</span>
          <h3 className="text-xl font-bold text-gray-800">명령형 렌더링 (QueryErrorBoundary 미사용)</h3>
        </div>
        <div className="rounded-md border-l-4 border-slate-400 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">💡 언제 사용하나요?</p>
          <p className="mt-1 text-sm text-slate-600">
            사이드바의 작은 위젯처럼 <strong>"에러가 나도 앱 전체나 메인 화면이 멈추면 안 되는 가벼운 UI"</strong>에 사용합니다. 컴포넌트 내부에서 <code className="bg-gray-200 px-1 text-red-500">isPending</code>과 <code className="bg-gray-200 px-1 text-red-500">isError</code>를 직접 체크하여 조용히
            처리합니다.
          </p>
        </div>
        <CodeBlock filename="src/components/widgets/UserWidget.tsx" htmlCode={step3Code} />
      </section>

      {/* --- STEP 4 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-blue-100 px-2 py-1 text-sm font-bold text-blue-700">STEP 4</span>
          <h3 className="text-xl font-bold text-gray-800">선언적 렌더링 (QueryErrorBoundary 사용)</h3>
        </div>
        <div className="rounded-md border-l-4 border-blue-400 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-800">💡 언제 사용하나요?</p>
          <p className="mt-1 text-sm text-blue-600">
            페이지의 메인 데이터처럼 <strong>"이 데이터가 없으면 화면을 보여주는 의미가 없는 핵심 UI"</strong>에 사용합니다. 훅 내부의 에러/로딩 체크 로직이 완벽히 사라지며, 부모의 <code className="bg-gray-200 px-1 text-red-500">&lt;QueryErrorBoundary&gt;</code>가 에러 복구(Reset)를 전담합니다.
          </p>
        </div>
        <CodeBlock filename="src/routes/_auth.users.tsx" htmlCode={step4Code} />
      </section>
    </div>
  )
}

function CodeBlock({ filename, htmlCode }: { filename: string; htmlCode: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#1e1e1e] font-mono text-[13px] shadow-xl">
      <div className="flex items-center border-b border-gray-800 bg-[#252526] px-4 py-2">
        <div className="mr-4 flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-gray-400">{filename}</span>
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed text-[#d4d4d4]" dangerouslySetInnerHTML={{ __html: htmlCode }} />
    </div>
  )
}

// ----------------------------------------------------------------------------
// 코드 스니펫 HTML 상수 (VS Code 렌더링 유지)
// ----------------------------------------------------------------------------

const step1Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">request</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/lib/api'</span>

<span style="color:#6a9955">// GET 요청</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">fetchUsers</span> = <span style="color:#569cd6">async</span> (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#c586c0">await</span> <span style="color:#dcdcaa">request</span>(<span style="color:#ce9178">'users'</span>, {
    <span style="color:#9cdcfe">searchParams</span>: { <span style="color:#9cdcfe">page</span> }
  })
}

<span style="color:#6a9955">// POST 요청</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">createUser</span> = <span style="color:#569cd6">async</span> (<span style="color:#9cdcfe">body</span>: <span style="color:#4ec9b0">Partial</span>&lt;<span style="color:#4ec9b0">User</span>&gt;) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#c586c0">await</span> <span style="color:#dcdcaa">request</span>(<span style="color:#ce9178">'users'</span>, {
    <span style="color:#9cdcfe">method</span>: <span style="color:#ce9178">'POST'</span>,
    <span style="color:#9cdcfe">json</span>: <span style="color:#9cdcfe">body</span>,
  })
}`.trim()

const step2Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useQuery</span>, <span style="color:#9cdcfe">useSuspenseQuery</span>, <span style="color:#9cdcfe">useMutation</span>, <span style="color:#9cdcfe">useQueryClient</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@tanstack/react-query'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">toast</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'sonner'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">fetchUsers</span>, <span style="color:#9cdcfe">createUser</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/api/users'</span>

<span style="color:#6a9955">// Key Factory Pattern</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#4fc1ff">userKeys</span> = {
  <span style="color:#9cdcfe">all</span>: [<span style="color:#ce9178">'users'</span>] <span style="color:#569cd6">as</span> <span style="color:#569cd6">const</span>,
  <span style="color:#dcdcaa">list</span>: (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> [...<span style="color:#9cdcfe">userKeys</span>.<span style="color:#9cdcfe">all</span>, <span style="color:#ce9178">'list'</span>, <span style="color:#9cdcfe">page</span>] <span style="color:#569cd6">as</span> <span style="color:#569cd6">const</span>,
}

<span style="color:#6a9955">// 1. 일반 Query (ErrorBoundary 미사용 시 / 옵셔널 체이닝 필요)</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">useUsers</span> = (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#dcdcaa">useQuery</span>({
    <span style="color:#9cdcfe">queryKey</span>: <span style="color:#9cdcfe">userKeys</span>.<span style="color:#dcdcaa">list</span>(<span style="color:#9cdcfe">page</span>),
    <span style="color:#dcdcaa">queryFn</span>: () <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">fetchUsers</span>(<span style="color:#9cdcfe">page</span>),
  })
}

<span style="color:#6a9955">// 2. Suspense Query + Select (데이터 가공)</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">useUsersSuspense</span> = (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#dcdcaa">useSuspenseQuery</span>({
    <span style="color:#9cdcfe">queryKey</span>: <span style="color:#9cdcfe">userKeys</span>.<span style="color:#dcdcaa">list</span>(<span style="color:#9cdcfe">page</span>),
    <span style="color:#dcdcaa">queryFn</span>: () <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">fetchUsers</span>(<span style="color:#9cdcfe">page</span>),
    <span style="color:#6a9955">// 💡 select: 원본 캐시는 유지하면서 컴포넌트 렌더링용 데이터를 가공합니다.</span>
    <span style="color:#dcdcaa">select</span>: (<span style="color:#9cdcfe">users</span>) <span style="color:#569cd6">=&gt;</span> <span style="color:#9cdcfe">users</span>.<span style="color:#dcdcaa">map</span>(<span style="color:#9cdcfe">user</span> <span style="color:#569cd6">=&gt;</span> ({
      ...<span style="color:#9cdcfe">user</span>,
      <span style="color:#9cdcfe">displayName</span>: <span style="color:#ce9178">\`[\${</span><span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">role</span><span style="color:#ce9178">}] \${</span><span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">name</span><span style="color:#ce9178">}\`</span>
    }))
  })
}

<span style="color:#6a9955">// 3. Mutation (데이터 생성/수정/삭제)</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">useCreateUser</span> = () <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#569cd6">const</span> <span style="color:#9cdcfe">queryClient</span> = <span style="color:#dcdcaa">useQueryClient</span>()
  
  <span style="color:#c586c0">return</span> <span style="color:#dcdcaa">useMutation</span>({
    <span style="color:#9cdcfe">mutationFn</span>: <span style="color:#9cdcfe">createUser</span>,
    <span style="color:#dcdcaa">onSuccess</span>: () <span style="color:#569cd6">=&gt;</span> {
      <span style="color:#9cdcfe">toast</span>.<span style="color:#dcdcaa">success</span>(<span style="color:#ce9178">'성공적으로 생성되었습니다!'</span>)
      <span style="color:#6a9955">// 생성 완료 후 리스트 캐시를 무효화하여 자동 새로고침 유도</span>
      <span style="color:#9cdcfe">queryClient</span>.<span style="color:#dcdcaa">invalidateQueries</span>({ <span style="color:#9cdcfe">queryKey</span>: <span style="color:#9cdcfe">userKeys</span>.<span style="color:#9cdcfe">all</span> })
    },
  })
}`.trim()

const step3Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useUsers</span>, <span style="color:#9cdcfe">useCreateUser</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/hooks/queries/useUsers'</span>

<span style="color:#c586c0">export</span> <span style="color:#569cd6">function</span> <span style="color:#dcdcaa">UserWidget</span>() {
  <span style="color:#6a9955">// ErrorBoundary가 없으므로 isPending, isError를 사용해서 분기 처리해야 합니다.</span>
  <span style="color:#569cd6">const</span> { <span style="color:#9cdcfe">data</span>: <span style="color:#9cdcfe">users</span>, <span style="color:#9cdcfe">isPending</span>, <span style="color:#9cdcfe">isError</span>, <span style="color:#9cdcfe">refetch</span> } = <span style="color:#dcdcaa">useUsers</span>(<span style="color:#b5cea8">1</span>)
  <span style="color:#569cd6">const</span> <span style="color:#9cdcfe">mutation</span> = <span style="color:#dcdcaa">useCreateUser</span>()

  <span style="color:#6a9955">// 1. 에러 체크 UI</span>
  <span style="color:#c586c0">if</span> (<span style="color:#9cdcfe">isError</span>) {
    <span style="color:#c586c0">return</span> (
      &lt;<span style="color:#569cd6">div</span>&gt;
        데이터 로드 실패 &lt;<span style="color:#569cd6">button</span> <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">refetch</span>()}&gt;다시 시도&lt;/<span style="color:#569cd6">button</span>&gt;
      &lt;/<span style="color:#569cd6">div</span>&gt;
    )
  }

  <span style="color:#6a9955">// 2. 로딩 체크 UI</span>
  <span style="color:#c586c0">if</span> (<span style="color:#9cdcfe">isPending</span>) <span style="color:#c586c0">return</span> &lt;<span style="color:#569cd6">div</span>&gt;위젯 로딩 중...&lt;/<span style="color:#569cd6">div</span>&gt;

  <span style="color:#c586c0">return</span> (
    &lt;<span style="color:#569cd6">div</span>&gt;
      &lt;<span style="color:#569cd6">ul</span>&gt;{<span style="color:#9cdcfe">users</span>?.<span style="color:#dcdcaa">map</span>(<span style="color:#9cdcfe">u</span> <span style="color:#569cd6">=&gt;</span> &lt;<span style="color:#569cd6">li</span> <span style="color:#9cdcfe">key</span>={<span style="color:#9cdcfe">u</span>.<span style="color:#9cdcfe">id</span>}&gt;{<span style="color:#9cdcfe">u</span>.<span style="color:#9cdcfe">name</span>}&lt;/<span style="color:#569cd6">li</span>&gt;)}&lt;/<span style="color:#569cd6">ul</span>&gt;
      
      <span style="color:#6a9955">{/* Mutation 사용 예시 */}</span>
      &lt;<span style="color:#569cd6">button</span> 
        <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#9cdcfe">mutation</span>.<span style="color:#dcdcaa">mutate</span>({ <span style="color:#9cdcfe">name</span>: <span style="color:#ce9178">'New User'</span> })} 
        <span style="color:#9cdcfe">disabled</span>={<span style="color:#9cdcfe">mutation</span>.<span style="color:#9cdcfe">isPending</span>}
      &gt;
        {<span style="color:#9cdcfe">mutation</span>.<span style="color:#9cdcfe">isPending</span> ? <span style="color:#ce9178">'생성 중...'</span> : <span style="color:#ce9178">'새 유저 추가'</span>}
      &lt;/<span style="color:#569cd6">button</span>&gt;
    &lt;/<span style="color:#569cd6">div</span>&gt;
  )
}`.trim()

const step4Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">Suspense</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'react'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">QueryErrorBoundary</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/components/common/QueryErrorBoundary'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useUsersSuspense</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/hooks/queries/useUsers'</span>

<span style="color:#6a9955">// 1. 하위 컴포넌트: 비즈니스 로직(데이터)과 UI 렌더링에만 100% 집중합니다.</span>
<span style="color:#c586c0">function</span> <span style="color:#dcdcaa">DeclarativeUserList</span>() {
  <span style="color:#6a9955">// 🚨 에러나 로딩을 체크하는 코드가 없습니다! 데이터가 무조건 있다고 보장됩니다.</span>
  <span style="color:#569cd6">const</span> { <span style="color:#9cdcfe">data</span>: <span style="color:#9cdcfe">users</span> } = <span style="color:#dcdcaa">useUsersSuspense</span>(<span style="color:#b5cea8">1</span>)

  <span style="color:#c586c0">return</span> (
    &lt;<span style="color:#569cd6">ul</span>&gt;{<span style="color:#9cdcfe">users</span>.<span style="color:#dcdcaa">map</span>(<span style="color:#9cdcfe">user</span> <span style="color:#569cd6">=&gt;</span> &lt;<span style="color:#569cd6">li</span> <span style="color:#9cdcfe">key</span>={<span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">id</span>}&gt;{<span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">name</span>}&lt;/<span style="color:#569cd6">li</span>&gt;)}&lt;/<span style="color:#569cd6">ul</span>&gt;
  )
}

<span style="color:#6a9955">// 💡 (선택) 특정 페이지 전용 커스텀 에러 화면이 필요할 때 주입할 컴포넌트</span>
<span style="color:#6a9955">// import { FallbackProps } from 'react-error-boundary'</span>
<span style="color:#6a9955">// const CustomError = ({ error, resetErrorBoundary }: FallbackProps) =&gt; (</span>
<span style="color:#6a9955">//   &lt;div className="p-4 bg-red-900 text-white"&gt;</span>
<span style="color:#6a9955">//     커스텀 에러: {error.message}</span>
<span style="color:#6a9955">//     &lt;button onClick={resetErrorBoundary}&gt;복구 시도&lt;/button&gt;</span>
<span style="color:#6a9955">//   &lt;/div&gt;</span>
<span style="color:#6a9955">// )</span>

<span style="color:#6a9955">// 2. 부모 래퍼 컴포넌트: 에러와 로딩 상태를 '선언적'으로 위임받아 처리합니다.</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">function</span> <span style="color:#dcdcaa">UsersPage</span>() {
  <span style="color:#c586c0">return</span> (
    <span style="color:#6a9955">{/* 가장 바깥에서 에러를 캐치하고 '다시 시도(Reset)' 버튼을 제공합니다 */}</span>
    <span style="color:#6a9955">{/* 💡 커스텀 에러 사용 시: &lt;QueryErrorBoundary FallbackComponent={CustomError}&gt; */}</span>
    &lt;<span style="color:#4ec9b0">QueryErrorBoundary</span>&gt;
      <span style="color:#6a9955">{/* 데이터를 불러오는 동안 fallback(스켈레톤 UI)을 보여줍니다 */}</span>
      &lt;<span style="color:#4ec9b0">Suspense</span> <span style="color:#9cdcfe">fallback</span>={&lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"animate-pulse"</span>&gt;페이지 로딩 중...&lt;/<span style="color:#569cd6">div</span>&gt;}&gt;
        &lt;<span style="color:#4ec9b0">DeclarativeUserList</span> /&gt;
      &lt;/<span style="color:#4ec9b0">Suspense</span>&gt;
    &lt;/<span style="color:#4ec9b0">QueryErrorBoundary</span>&gt;
  )
}`.trim()
