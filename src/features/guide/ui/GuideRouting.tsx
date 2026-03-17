export function GuideRouting() {
  return (
    <div className="max-w-5xl space-y-12 pb-32">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">TanStack Router 파일 라우팅 규칙</h2>
        <p className="mt-2 text-gray-600">
          본 스타트킷은 깊은 폴더 중첩을 피하고, 한눈에 구조를 파악할 수 있는 <strong>Flat Routes</strong> 구조를 채택했습니다.
          <br />
          프레임워크 고유의 특수 기호(<code className="bg-gray-100 px-1 text-red-500">_</code>, <code className="bg-gray-100 px-1 text-red-500">.</code>, <code className="bg-gray-100 px-1 text-red-500">$</code>)에 대한 명명 규칙 가이드입니다.
        </p>
      </div>

      {/* --- STEP 1 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 1</span>
          <h3 className="text-xl font-bold text-gray-800">핵심 네이밍 컨벤션 (Flat Routes)</h3>
        </div>
        <p className="text-sm text-gray-600">
          폴더를 만드는 대신 <strong>점(.)</strong>을 사용하여 부모-자식 관계를 표현합니다.
        </p>
        <CodeBlock filename="src/routes/ 트리 구조" htmlCode={step1Code} />
      </section>

      {/* --- STEP 2 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 2</span>
          <h3 className="text-xl font-bold text-gray-800">언더스코어 (_) : Pathless 레이아웃 & 가드</h3>
        </div>
        <p className="text-sm text-gray-600">
          파일명이 <code className="bg-gray-100 px-1 text-red-500">_</code>로 시작하면, 해당 파일은 <strong>실제 URL 경로를 생성하지 않습니다.</strong>
          <br />
          오직 하위 파일들에게 <strong>공통 UI(레이아웃)</strong>나 <strong>네비게이션 가드(인증 등)</strong>를 제공하는 용도로만 쓰입니다.
        </p>
        <CodeBlock filename="src/routes/_auth.tsx" htmlCode={step2Code} />
      </section>

      {/* --- STEP 3 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 3</span>
          <h3 className="text-xl font-bold text-gray-800">달러 기호 ($) : 동적 파라미터 (Dynamic Segments)</h3>
        </div>
        <p className="text-sm text-gray-600">
          Vue의 <code className="bg-gray-100 px-1">_id.vue</code> 또는 <code className="bg-gray-100 px-1">[id].vue</code>와 동일한 역할입니다.
          <br />
          컴포넌트 내부에서 <code className="bg-gray-100 px-1 text-red-500">Route.useParams()</code>를 통해 타입 안전하게 파라미터를 가져올 수 있습니다.
        </p>
        <CodeBlock filename="src/routes/users.$userId.tsx" htmlCode={step3Code} />
      </section>

      {/* --- STEP 4 --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-indigo-100 px-2 py-1 text-sm font-bold text-indigo-700">STEP 4</span>
          <h3 className="text-xl font-bold text-gray-800">Type-Safe 네비게이션 (Link & useNavigate)</h3>
        </div>
        <p className="text-sm text-gray-600">
          TanStack Router의 가장 큰 장점입니다. 존재하지 않는 경로나, 필수 파라미터가 누락되면 즉시 <strong>TypeScript 에러</strong>가 발생하여 휴먼 에러를 원천 차단합니다.
        </p>
        <CodeBlock filename="src/components/NavigationExample.tsx" htmlCode={step4Code} />
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

const step1Code = `
<span style="color:#6a9955">// src/routes/</span>
<span style="color:#d4d4d4">├── </span><span style="color:#9cdcfe">__root.tsx</span><span style="color:#6a9955">          // 최상위 루트 레이아웃 (모든 페이지를 감쌈)</span>
<span style="color:#d4d4d4">├── </span><span style="color:#9cdcfe">index.tsx</span><span style="color:#6a9955">           // 메인 홈 ('/')</span>
<span style="color:#d4d4d4">├── </span><span style="color:#9cdcfe">login.tsx</span><span style="color:#6a9955">           // 일반 공개 라우트 ('/login')</span>
<span style="color:#d4d4d4">├── </span><span style="color:#9cdcfe">_auth.tsx</span><span style="color:#6a9955">           // Pathless 라우트 (URL 변경 없이 레이아웃/가드만 제공)</span>
<span style="color:#d4d4d4">├── </span><span style="color:#9cdcfe">_auth.dashboard.tsx</span><span style="color:#6a9955"> // '/dashboard' (_auth의 보호를 받음)</span>
<span style="color:#d4d4d4">├── </span><span style="color:#9cdcfe">_auth/dashboard.tsx</span><span style="color:#6a9955"> // '/dashboard' (_auth/ 폴더로 만들어도 동일함)</span>
<span style="color:#d4d4d4">└── </span><span style="color:#9cdcfe">users.$userId.tsx</span><span style="color:#6a9955">   // 동적 파라미터 라우트 ('/users/123')</span>
`.trim()

const step2Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">createFileRoute</span>, <span style="color:#9cdcfe">redirect</span>, <span style="color:#9cdcfe">Outlet</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@tanstack/react-router'</span>

<span style="color:#6a9955">// '_'로 시작하므로 URL 경로(/auth)를 만들지 않습니다.</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#4fc1ff">Route</span> = <span style="color:#dcdcaa">createFileRoute</span>(<span style="color:#ce9178">'/_auth'</span>)({
  <span style="color:#dcdcaa">beforeLoad</span>: () <span style="color:#569cd6">=&gt;</span> {
    <span style="color:#569cd6">const</span> <span style="color:#4fc1ff">isAuthenticated</span> = <span style="color:#569cd6">false</span> <span style="color:#6a9955">// 상태 스토어에서 확인</span>
    <span style="color:#c586c0">if</span> (!<span style="color:#9cdcfe">isAuthenticated</span>) {
      <span style="color:#c586c0">throw</span> <span style="color:#dcdcaa">redirect</span>({ <span style="color:#9cdcfe">to</span>: <span style="color:#ce9178">'/login'</span> })
    }
  },
  <span style="color:#9cdcfe">component</span>: <span style="color:#dcdcaa">AuthLayout</span>,
})

<span style="color:#c586c0">function</span> <span style="color:#dcdcaa">AuthLayout</span>() {
  <span style="color:#c586c0">return</span> (
    &lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex"</span>&gt;
      &lt;<span style="color:#4ec9b0">Sidebar</span> /&gt;
      &lt;<span style="color:#569cd6">main</span>&gt;
        &lt;<span style="color:#4ec9b0">Outlet</span> /&gt; <span style="color:#6a9955">{/* _auth.dashboard.tsx 등 자식 요소가 그려집니다 */}</span>
      &lt;/<span style="color:#569cd6">main</span>&gt;
    &lt;/<span style="color:#569cd6">div</span>&gt;
  )
}
`.trim()

const step3Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">createFileRoute</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@tanstack/react-router'</span>

<span style="color:#6a9955">// '$' 기호는 동적 파라미터(userId)를 의미합니다.</span>
<span style="color:#c586c0">export</span> <span style="color:#569cd6">const</span> <span style="color:#4fc1ff">Route</span> = <span style="color:#dcdcaa">createFileRoute</span>(<span style="color:#ce9178">'/users/$userId'</span>)({
  <span style="color:#9cdcfe">component</span>: <span style="color:#dcdcaa">UserProfilePage</span>,
})

<span style="color:#c586c0">function</span> <span style="color:#dcdcaa">UserProfilePage</span>() {
  <span style="color:#6a9955">// 제너레이터가 Route 객체에 파라미터 타입을 완벽하게 매핑해둡니다.</span>
  <span style="color:#569cd6">const</span> { <span style="color:#4fc1ff">userId</span> } = <span style="color:#4fc1ff">Route</span>.<span style="color:#dcdcaa">useParams</span>()

  <span style="color:#c586c0">return</span> &lt;<span style="color:#569cd6">div</span>&gt;조회 중인 유저 ID: {<span style="color:#9cdcfe">userId</span>}&lt;/<span style="color:#569cd6">div</span>&gt;
}
`.trim()

const step4Code = `
<span style="color:#c586c0">import</span> { <span style="color:#9cdcfe">Link</span>, <span style="color:#9cdcfe">useNavigate</span> } <span style="color:#c586c0">from</span> <span style="color:#ce9178">'@tanstack/react-router'</span>

<span style="color:#c586c0">export</span> <span style="color:#569cd6">function</span> <span style="color:#dcdcaa">NavigationExample</span>() {
  <span style="color:#569cd6">const</span> <span style="color:#4fc1ff">navigate</span> = <span style="color:#dcdcaa">useNavigate</span>()

  <span style="color:#c586c0">return</span> (
    &lt;<span style="color:#569cd6">div</span> <span style="color:#9cdcfe">className</span>=<span style="color:#ce9178">"flex gap-4"</span>&gt;
      <span style="color:#6a9955">{/* 1. 선언적 라우팅 (에디터 자동완성 지원) */}</span>
      &lt;<span style="color:#4ec9b0">Link</span> 
        <span style="color:#9cdcfe">to</span>=<span style="color:#ce9178">"/dashboard"</span> 
        <span style="color:#9cdcfe">activeProps</span>={{ <span style="color:#9cdcfe">className</span>: <span style="color:#ce9178">'font-bold text-blue-500'</span> }}
      &gt;
        대시보드로 이동
      &lt;/<span style="color:#4ec9b0">Link</span>&gt;

      <span style="color:#6a9955">{/* 2. 명령형 라우팅 (파라미터 누락 시 타입 에러 발생) */}</span>
      &lt;<span style="color:#4ec9b0">Button</span> 
        <span style="color:#9cdcfe">onClick</span>={<span style="color:#dcdcaa">()</span> <span style="color:#569cd6">=&gt;</span> <span style="color:#dcdcaa">navigate</span>({ 
          <span style="color:#9cdcfe">to</span>: <span style="color:#ce9178">'/users/$userId'</span>, 
          <span style="color:#9cdcfe">params</span>: { <span style="color:#9cdcfe">userId</span>: <span style="color:#ce9178">'123'</span> } 
        })}
      &gt;
        123번 유저 보기
      &lt;/<span style="color:#4ec9b0">Button</span>&gt;
    &lt;/<span style="color:#569cd6">div</span>&gt;
  )
}
`.trim()
