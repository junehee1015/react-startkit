// src/components/guide/GuideApi.tsx

export function GuideApi() {
  return (
    <div className="max-w-5xl space-y-12 pb-32">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">API & Data Fetching 아키텍처 (React)</h2>
        <p className="mt-2 text-gray-600">
          본 스타트킷은 <strong>Key Factory Pattern</strong>과 <strong>Custom Hook 비즈니스 로직 분리(Co-location)</strong>를 통해
          <br />
          유지보수가 극대화된 데이터 페칭 구조를 지향합니다.
        </p>
      </div>

      {/* --- STEP 1 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 1</span>
          <h3 className="text-xl font-bold text-gray-800">API 통신 정의 (api/ 디렉토리)</h3>
        </div>
        <p className="text-sm text-gray-600">이 계층은 오직 네트워크 요청만 담당합니다. ky 래퍼 인스턴스를 활용합니다.</p>
        <CodeBlock filename="src/api/users.ts" htmlCode={step1Code} />
      </section>

      {/* --- STEP 2 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 2</span>
          <h3 className="text-xl font-bold text-gray-800">TanStack Query 코로케이션 및 에러 처리 (hooks/queries/)</h3>
        </div>
        <p className="text-sm text-gray-600">
          캐시 키(Key Factory)와 비즈니스 로직(useQuery)을 <strong>함께(Co-location)</strong> 작성합니다.
          <br />
          <strong>에러 처리:</strong> 훅 내부에서 <code className="bg-gray-100 px-1 text-red-500">useEffect</code>나 <code className="bg-gray-100 px-1 text-red-500">onError</code>를 활용해 백그라운드 Toast 알림을 띄웁니다.
        </p>
        <CodeBlock filename="src/hooks/queries/useUsers.ts" htmlCode={step2Code} />
      </section>

      {/* --- STEP 3 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 3</span>
          <h3 className="text-xl font-bold text-gray-800">명령형 렌더링 (Background Fetching 용도)</h3>
        </div>
        <p className="text-sm text-gray-600">
          화면 전체를 로딩으로 덮고 싶지 않거나, 백그라운드에서 데이터를 갱신할 때 사용하는 전통적인 방식입니다.
          <br />
          컴포넌트 내부에서 <code className="bg-gray-100 px-1 text-red-500">isPending</code>과 <code className="bg-gray-100 px-1 text-red-500">isError</code>를 if문으로 직접 체크하여 UI를 분기 처리합니다.
        </p>
        <CodeBlock filename="src/routes/_auth.users-imperative.tsx" htmlCode={step3Code} />
      </section>

      {/* --- STEP 4 (확장됨) --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 4</span>
          <h3 className="text-xl font-bold text-gray-800">선언적 렌더링 (초기 렌더링 블로킹 용도)</h3>
        </div>
        <p className="text-sm text-gray-600">
          React 18의 핵심 패턴입니다. <code className="bg-gray-100 px-1 text-red-500">useSuspenseQuery</code>를 사용하면 컴포넌트 내부의 로딩/에러 체크 코드가 완전히 사라집니다.
          <br />
          로딩 상태는 부모의 <code className="bg-gray-100 px-1 text-red-500">&lt;Suspense&gt;</code>가, 에러 상태는 <code className="bg-gray-100 px-1 text-red-500">&lt;ErrorBoundary&gt;</code>가 낚아채어 처리(Catch)합니다.
        </p>
        <CodeBlock filename="src/routes/_auth.users-suspense.tsx" htmlCode={step4Code} />
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

<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">fetchUsers</span> = <span style="color:#569cd6">async</span> (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#c586c0">await</span> <span style="color:#dcdcaa">request</span>(<span style="color:#ce9178">'users'</span>, {
    <span style="color:#9cdcfe">searchParams</span>: { <span style="color:#9cdcfe">page</span> }
  })
}

<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">createUser</span> = <span style="color:#569cd6">async</span> (<span style="color:#9cdcfe">body</span>: <span style="color:#4ec9b0">Partial</span>&lt;<span style="color:#4ec9b0">User</span>&gt;) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#c586c0">await</span> <span style="color:#dcdcaa">request</span>(<span style="color:#ce9178">'users'</span>, {
    <span style="color:#9cdcfe">method</span>: <span style="color:#ce9178">'POST'</span>,
    <span style="color:#9cdcfe">json</span>: <span style="color:#9cdcfe">body</span>,
  })
}`.trim()

const step2Code = `
<span style="color:#6a9955">// Key Factory Pattern 및 훅 코로케이션</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useEffect</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'react'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useQuery</span>, <span style="color:#9cdcfe">useSuspenseQuery</span>, <span style="color:#9cdcfe">useMutation</span>, <span style="color:#9cdcfe">useQueryClient</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@tanstack/react-query'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">toast</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'sonner'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">fetchUsers</span>, <span style="color:#9cdcfe">createUser</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/api/users'</span>

<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#4fc1ff">userKeys</span> = {
  <span style="color:#9cdcfe">all</span>: [<span style="color:#ce9178">'users'</span>] <span style="color:#569cd6">as</span> <span style="color:#569cd6">const</span>,
  <span style="color:#dcdcaa">list</span>: (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> [...<span style="color:#9cdcfe">userKeys</span>.<span style="color:#9cdcfe">all</span>, <span style="color:#ce9178">'list'</span>, <span style="color:#9cdcfe">page</span>] <span style="color:#569cd6">as</span> <span style="color:#569cd6">const</span>,
}

<span style="color:#6a9955">// 1. 명령형 훅 (데이터가 없을 수도 있음)</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">useUsers</span> = (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#569cd6">const</span> <span style="color:#9cdcfe">query</span> = <span style="color:#dcdcaa">useQuery</span>({
    <span style="color:#9cdcfe">queryKey</span>: <span style="color:#9cdcfe">userKeys</span>.<span style="color:#dcdcaa">list</span>(<span style="color:#9cdcfe">page</span>),
    <span style="color:#dcdcaa">queryFn</span>: () <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">fetchUsers</span>(<span style="color:#9cdcfe">page</span>),
  })

  <span style="color:#dcdcaa">useEffect</span>(() <span style="color:#569cd6">=&gt;</span> {
    <span style="color:#c586c0">if</span> (<span style="color:#9cdcfe">query</span>.<span style="color:#9cdcfe">isError</span>) <span style="color:#9cdcfe">toast</span>.<span style="color:#dcdcaa">error</span>(<span style="color:#ce9178">'데이터 로드 실패'</span>)
  }, [<span style="color:#9cdcfe">query</span>.<span style="color:#9cdcfe">isError</span>])

  <span style="color:#c586c0">return</span> <span style="color:#9cdcfe">query</span>
}

<span style="color:#6a9955">// 2. 선언적 훅 (데이터가 100% 존재함을 보장함)</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#dcdcaa">useUsersSuspense</span> = (<span style="color:#9cdcfe">page</span>: <span style="color:#4ec9b0">number</span>) <span style="color:#569cd6">=&gt;</span> {
  <span style="color:#c586c0">return</span> <span style="color:#dcdcaa">useSuspenseQuery</span>({
    <span style="color:#9cdcfe">queryKey</span>: <span style="color:#9cdcfe">userKeys</span>.<span style="color:#dcdcaa">list</span>(<span style="color:#9cdcfe">page</span>),
    <span style="color:#dcdcaa">queryFn</span>: () <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">fetchUsers</span>(<span style="color:#9cdcfe">page</span>),
  })
}`.trim()

const step3Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useState</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'react'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useUsers</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/hooks/queries/useUsers'</span>

<span style="color:#c586c0">export</span> <span style="color:#569cd6">function</span> <span style="color:#dcdcaa">ImperativeUserList</span>() {
  <span style="color:#569cd6">const</span> [<span style="color:#9cdcfe">page</span>, <span style="color:#dcdcaa">setPage</span>] = <span style="color:#dcdcaa">useState</span>(<span style="color:#b5cea8">1</span>)
  
  <span style="color:#6a9955">// 훅 내부에서 isLoading, isError 등을 전부 뽑아와야 합니다.</span>
  <span style="color:#569cd6">const</span> { <span style="color:#9cdcfe">data</span>: <span style="color:#9cdcfe">users</span>, <span style="color:#9cdcfe">isPending</span>, <span style="color:#9cdcfe">isError</span>, <span style="color:#9cdcfe">error</span> } = <span style="color:#dcdcaa">useUsers</span>(<span style="color:#9cdcfe">page</span>)

  <span style="color:#6a9955">// 1. 에러 체크 UI</span>
  <span style="color:#c586c0">if</span> (<span style="color:#9cdcfe">isError</span>) {
    <span style="color:#c586c0">return</span> &lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"text-red-500"</span>&gt;에러: {<span style="color:#9cdcfe">error</span>.<span style="color:#9cdcfe">message</span>}&lt;/<span style="color:#569cd6">div</span>&gt;
  }

  <span style="color:#c586c0">return</span> (
    &lt;<span style="color:#569cd6">div</span>&gt;
      {<span style="color:#6a9955">/* 2. 로딩 체크 UI */</span>}
      {<span style="color:#9cdcfe">isPending</span> ? (
        &lt;<span style="color:#569cd6">div</span>&gt;로딩 중...&lt;/<span style="color:#569cd6">div</span>&gt;
      ) : (
        &lt;<span style="color:#569cd6">ul</span>&gt;
          {<span style="color:#6a9955">/* 3. 데이터가 없을 수도 있으므로 옵셔널 체이닝(?) 필수 */</span>}
          {<span style="color:#9cdcfe">users</span>?.<span style="color:#dcdcaa">map</span>(<span style="color:#9cdcfe">user</span> <span style="color:#569cd6">=&gt;</span> (
            &lt;<span style="color:#569cd6">li</span> <span style="color:#9cdcfe">key</span>={<span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">id</span>}&gt;{<span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">name</span>}&lt;/<span style="color:#569cd6">li</span>&gt;
          ))}
        &lt;/<span style="color:#569cd6">ul</span>&gt;
      )}
    &lt;/<span style="color:#569cd6">div</span>&gt;
  )
}`.trim()

const step4Code = `
<span style="color:#6a9955">// 터미널에서 pnpm add react-error-boundary 설치 필요</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">Suspense</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'react'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">ErrorBoundary</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'react-error-boundary'</span>
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">useUsersSuspense</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@/hooks/queries/useUsers'</span>

<span style="color:#6a9955">// 1. 하위 컴포넌트: 에러/로딩 체크가 완벽히 사라진 동기적인 코드 모습</span>
<span style="color:#c586c0">function</span> <span style="color:#dcdcaa">DeclarativeUserList</span>() {
  <span style="color:#6a9955">// useSuspenseQuery를 쓰면 data가 무조건 존재함을 보장합니다. (옵셔널 체이닝 불필요)</span>
  <span style="color:#569cd6">const</span> { <span style="color:#9cdcfe">data</span>: <span style="color:#9cdcfe">users</span> } = <span style="color:#dcdcaa">useUsersSuspense</span>(<span style="color:#b5cea8">1</span>)

  <span style="color:#c586c0">return</span> (
    &lt;<span style="color:#569cd6">ul</span>&gt;
      {<span style="color:#9cdcfe">users</span>.<span style="color:#dcdcaa">map</span>(<span style="color:#9cdcfe">user</span> <span style="color:#569cd6">=&gt;</span> &lt;<span style="color:#569cd6">li</span> <span style="color:#9cdcfe">key</span>={<span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">id</span>}&gt;{<span style="color:#9cdcfe">user</span>.<span style="color:#9cdcfe">name</span>}&lt;/<span style="color:#569cd6">li</span>&gt;)}
    &lt;/<span style="color:#569cd6">ul</span>&gt;
  )
}

<span style="color:#6a9955">// 2. 부모 래퍼 컴포넌트: 에러와 로딩을 선언적으로 위임받아 처리</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">function</span> <span style="color:#dcdcaa">UsersPage</span>() {
  <span style="color:#c586c0">return</span> (
    <span style="color:#6a9955">{/* 가장 바깥에서 에러를 캐치합니다 */}</span>
    &lt;<span style="color:#4ec9b0">ErrorBoundary</span> <span style="color:#9cdcfe">fallback</span>={&lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"text-red-500"</span>&gt;데이터 로드 실패&lt;/<span style="color:#569cd6">div</span>&gt;}&gt;
      <span style="color:#6a9955">{/* 데이터를 불러오는 동안 fallback(스켈레톤)을 보여줍니다 */}</span>
      &lt;<span style="color:#4ec9b0">Suspense</span> <span style="color:#9cdcfe">fallback</span>={&lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"animate-pulse"</span>&gt;데이터 불러오는 중...&lt;/<span style="color:#569cd6">div</span>&gt;}&gt;
        <span style="color:#6a9955">{/* 오직 "성공적으로 데이터를 가져온 상태"만 렌더링에 집중합니다 */}</span>
        &lt;<span style="color:#4ec9b0">DeclarativeUserList</span> /&gt;
      &lt;/<span style="color:#4ec9b0">Suspense</span>&gt;
    &lt;/<span style="color:#4ec9b0">ErrorBoundary</span>&gt;
  )
}`.trim()
