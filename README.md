# 🚀 React Startkit

실무 수준의 **확장성(Scalability)** 과 **타입 안정성(Type-Safety)** 을 최우선으로 고려한 **React 19** 프로젝트 템플릿입니다.  
최신 React 생태계의 Best Practice가 적용되어 있으며, 복잡한 초기 설정 없이 바로 비즈니스 로직 개발에 집중할 수 있습니다.

## ✨ Key Features

- **Architecture**:
  - **FSD-Lite**:
  - **Co-location**: 도메인별 훅(Hook)과 쿼리 키(Key Factory)의 응집도를 높인 구조
  - **3-Layer Fetching**: `API Definition` -> `Custom Query Hook` -> `View Component`
- **Developer Experience**:
  - **100% Type-Safe Routing**: TanStack Router를 통한 완벽한 라우트 파라미터 및 경로 타입 추론
  - **Declarative UI**: React 19의 `Suspense`와 `ErrorBoundary`를 활용한 선언적 로딩/에러 처리
- **Robust Auth**: `ky` 기반의 JWT 핸들링, Refresh Token **동시성 제어(Promise Lock)** 완벽 처리

---

## 🛠 Tech Stack

| Category           | Technology                                                                | Description                               |
| :----------------- | :------------------------------------------------------------------------ | :---------------------------------------- |
| **Core**           | [React 19](https://react.dev/)                                            | UI Library                                |
| **Build**          | [Vite 7](https://vitejs.dev/)                                             | Next Generation Frontend Tooling          |
| **Routing**        | [TanStack Router v1](https://tanstack.com/router/latest)                  | Type-safe, File-based Routing             |
| **State (Client)** | [Zustand v5](https://zustand-demo.pmnd.rs/)                               | Bear-necessities State Management         |
| **State (Server)** | [TanStack Query v5](https://tanstack.com/query/latest)                    | Auto Caching, Deduping, Background Update |
| **HTTP**           | [Ky](https://github.com/sindresorhus/ky)                                  | Tiny & elegant Fetch API Wrapper          |
| **Styling**        | [Tailwind CSS v4](https://tailwindcss.com/)                               | Utility-first CSS framework               |
| **UI Primitive**   | [Shadcn UI](https://ui.shadcn.com/)                                       | Accessible, customizable components       |
| **Validation**     | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Type-safe Form Validation                 |
| **Utils**          | [Day.js](https://day.js.org/), [Lucide React](https://lucide.dev/)        | Date formatting & Beautiful Icons         |

---

## 📂 Project Structure

```text
src/
├── api/                  # 도메인별 API 네트워크 요청 정의 (users.ts, auth.ts...)
├── assets/               # 정적 리소스 (Images, Fonts)
├── components/
│   ├── layout/           # 레이아웃 구성 요소 (Header.tsx, AppSidebar.tsx...)
│   └── ui/               # Shadcn UI 컴포넌트 모음 (수정 가능)
├── features/             # 도메인별 비즈니스 로직
│   └── auth/             # 인증 도메인
│       ├── api/
│       ├── components/
│       └── constants/
│       ├── hooks/
├── hooks/
│   └── useConfirm.ts     # UI 제어용 커스텀 훅
├── lib/                  # 전역 유틸리티 및 설정
│   ├── api.ts            # ky 인스턴스 (Interceptor & Token Logic)
│   ├── query-client.ts   # 전역 TanStack Query 설정 (전역 성공, 에러 처리 등)
│   └── utils.ts          # Tailwind 클래스 병합 함수 등
├── routes/               # TanStack Router 기반 파일 라우팅 폴더 (Flat Routes)
├── stores/               # Zustand 전역 스토어 (auth.ts...)
└── types/                # 전역 TypeScript 인터페이스 및 Zod 스키마
```

---

## 🚀 Getting Started

### 1. 의존성 설치 (pnpm 권장)

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm run dev
```

### 3. 빌드 및 프리뷰

```bash
pnpm run build
pnpm run preview
```

### 4. 환경 변수 설정 (.env)

루트 경로에 `.env` 파일을 생성하고 API 주소를 설정하세요.

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=React Startkit
```

---

## 📖 Architecture Guide

### 1. API & Data Fetching (3-Layer Pattern & Suspense)

데이터 흐름을 명확히 하고 컴포넌트를 순수하게 유지하기 위해 4단계 구조를 제안합니다. 실무 상황에 맞춰 명령형(Imperative) 방식과 선언적(Declarative) 방식을 선택하여 사용할 수 있습니다.

**Step 1: API 통신 정의 (`src/api/*.ts`)**
오직 네트워크 요청만 담당합니다. `ky` 래퍼 인스턴스를 활용합니다.

```ts
import { request } from '@/lib/api'

// GET 요청
export const fetchUsers = async (page: number) => {
  return await request('users', {
    searchParams: { page },
  })
}

// POST 요청
export const createUser = async (body: Partial<User>) => {
  return await request('users', {
    method: 'POST',
    json: body,
  })
}
```

**Step 2: TanStack Query 코로케이션 및 에러 처리 (`src/hooks/queries/*.ts`)**
**Query Key Factory Pattern**을 적용하여 키를 중앙 관리하고, 비즈니스 로직(useQuery)을 함께(Co-location) 작성합니다.

```ts
import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetchUsers, createUser } from '@/api/users'

// Key Factory Pattern
export const userKeys = {
  all: ['users'] as const,
  list: (page: number) => [...userKeys.all, 'list', page] as const,
}

// 1. 일반 Query (ErrorBoundary 미사용 시 / 옵셔널 체이닝 필요)
export const useUsers = (page: number) => {
  return useQuery({
    queryKey: userKeys.list(page),
    queryFn: () => fetchUsers(page),
  })
}

// 2. Suspense Query + Select (데이터 가공)
export const useUsersSuspense = (page: number) => {
  return useSuspenseQuery({
    queryKey: userKeys.list(page),
    queryFn: () => fetchUsers(page),
    // 💡 select: 원본 캐시는 유지하면서 컴포넌트 렌더링용 데이터를 가공합니다.
    select: (users) =>
      users.map((user) => ({
        ...user,
        displayName: `[${user.role}] ${user.name}`,
      })),
  })
}

// 3. Mutation (데이터 생성/수정/삭제)
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('성공적으로 생성되었습니다!')
      // 생성 완료 후 리스트 캐시를 무효화하여 자동 새로고침 유도
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
```

**Step 3: 명령형 렌더링 (QueryErrorBoundary 미사용)**
사이드바의 작은 위젯처럼 "에러가 나도 앱 전체나 메인 화면이 멈추면 안 되는 가벼운 UI"에 사용합니다. 컴포넌트 내부에서 isPending과 isError를 직접 체크하여 조용히 처리합니다.

```tsx
import { useUsers, useCreateUser } from '@/hooks/queries/useUsers'

export function UserWidget() {
  // ErrorBoundary가 없으므로 isPending, isError를 사용해서 분기 처리해야 합니다.
  const { data: users, isPending, isError, refetch } = useUsers(1)
  const mutation = useCreateUser()

  // 1. 에러 체크 UI
  if (isError) {
    return (
      <div>
        데이터 로드 실패 <button onClick={() => refetch()}>다시 시도</button>
      </div>
    )
  }

  // 2. 로딩 체크 UI
  if (isPending) return <div>위젯 로딩 중...</div>

  return (
    <div>
      <ul>
        {users?.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>

      {/* Mutation 사용 예시 */}
      <button onClick={() => mutation.mutate({ name: 'New User' })} disabled={mutation.isPending}>
        {mutation.isPending ? '생성 중...' : '새 유저 추가'}
      </button>
    </div>
  )
}
```

**Step 4: 선언적 렌더링 (QueryErrorBoundary 사용)**
페이지의 메인 데이터처럼 "이 데이터가 없으면 화면을 보여주는 의미가 없는 핵심 UI"에 사용합니다. 훅 내부의 에러/로딩 체크 로직이 완벽히 사라지며, 부모의 <QueryErrorBoundary>가 에러 복구(Reset)를 전담합니다.

```tsx
import { Suspense } from 'react'
import { QueryErrorBoundary } from '@/components/common/QueryErrorBoundary'
import { useUsersSuspense } from '@/hooks/queries/useUsers'

// 1. 하위 컴포넌트: 비즈니스 로직(데이터)과 UI 렌더링에만 100% 집중합니다.
function DeclarativeUserList() {
  // 🚨 에러나 로딩을 체크하는 코드가 없습니다! 데이터가 무조건 있다고 보장됩니다.
  const { data: users } = useUsersSuspense(1)

  return (
    <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
  )
}

// 💡 (선택) 특정 페이지 전용 커스텀 에러 화면이 필요할 때 주입할 컴포넌트
// import { FallbackProps } from 'react-error-boundary'
// const CustomError = ({ error, resetErrorBoundary }: FallbackProps) => (
//   <div className="p-4 bg-red-900 text-white">
//     커스텀 에러: {error.message}
//     <button onClick={resetErrorBoundary}>복구 시도</button>
//   </div>
// )

// 2. 부모 래퍼 컴포넌트: 에러와 로딩 상태를 '선언적'으로 위임받아 처리합니다.
export function UsersPage() {
  return (
    {/* 가장 바깥에서 에러를 캐치하고 '다시 시도(Reset)' 버튼을 제공합니다 */}
    {/* 💡 커스텀 에러 사용 시: <QueryErrorBoundary FallbackComponent={CustomError}> */}
    <QueryErrorBoundary>
      {/* 데이터를 불러오는 동안 fallback(스켈레톤 UI)을 보여줍니다 */}
      <Suspense fallback={<div className="animate-pulse">페이지 로딩 중...</div>}>
        <DeclarativeUserList />
      </Suspense>
    </QueryErrorBoundary>
  )
}
```

### 2. Authentication (Token Refresh)

`src/lib/api.ts`에는 강력한 **토큰 갱신(Refresh) 로직**이 내장되어 있습니다.

- **Auto Injection**: `ky` 인터셉터가 Zustand 스토어에서 토큰을 꺼내 자동 주입합니다.
- **Concurrency Control**: 401 에러가 동시에 발생해도, **`Promise Locking`** 패턴을 통해 갱신 API는 단 한 번만 호출됩니다.
- **Auto Logout**: 토큰 갱신 실패 시 자동으로 Zustand 상태를 비우고 순수 네이티브 API(`window.location.href`)를 통해 안전하게 로그인 화면으로 리다이렉트합니다.

### 3. File-based Routing (TanStack Router)

깊은 폴더 중첩을 피하는 **Flat Routes** 방식을 기본으로 사용합니다.

- `__root.tsx` : 최상위 레이아웃 (모달, 라우터 아웃렛)
- `index.tsx` → `/`
- `login.tsx` → `/login`
- `_auth.tsx` : URL 경로를 만들지 않는 Pathless 인증 레이아웃 가드
- `_auth.dashboard.tsx` → `/dashboard` (`_auth`의 보호를 받음)
- `users.$userId.tsx` → `/users/123` (동적 파라미터 `Route.useParams()`)

### 4. Type-Safe Navigation

라우팅 과정의 휴먼 에러를 막기 위해 프레임워크 수준의 타입 검사를 제공합니다.

```tsx
import { Link } from '@tanstack/react-router'

// ❌ 컴파일 에러: 'userId' 파라미터가 누락되었습니다.
<Link to="/users/$userId">유저 보기</Link>

// ✅ 정상 작동
<Link to="/users/$userId" params={{ userId: '123' }}>유저 보기</Link>
```

---

## ✅ Naming Convention

| Type                  | Case       | Example                            |
| :-------------------- | :--------- | :--------------------------------- |
| **Component File**    | PascalCase | `Button.tsx`, `Header.tsx`         |
| **Route File**        | Flat Case  | `_auth.dashboard.tsx`, `login.tsx` |
| **Custom Hook**       | camelCase  | `useMobile.ts`, `useConfirm.ts`    |
| **API Module**        | camelCase  | `users.ts`, `auth.ts`              |
| **Variable/Function** | camelCase  | `handleSubmit`, `fetchData`        |
| **Interface/Type**    | PascalCase | `User`, `LoginPayload`             |

---

## 📝 License

MIT License
