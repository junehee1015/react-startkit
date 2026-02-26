# 🚀 React Startkit

실무 수준의 **확장성(Scalability)** 과 **타입 안정성(Type-Safety)** 을 최우선으로 고려한 **React 19** 프로젝트 템플릿입니다.  
최신 React 생태계의 Best Practice가 적용되어 있으며, 복잡한 초기 설정 없이 바로 비즈니스 로직 개발에 집중할 수 있습니다.

## ✨ Key Features

- **Architecture**:
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
│   ├── guide/            # (개발 가이드용 컴포넌트 - 배포 시 제외)
│   └── ui/               # Shadcn UI 컴포넌트 모음 (수정 가능)
├── hooks/
│   ├── queries/          # TanStack Query 커스텀 훅 및 Key Factory (useUsers.ts...)
│   └── useConfirm.ts     # UI 제어용 커스텀 훅
├── lib/                  # 전역 유틸리티 및 설정
│   ├── api.ts            # ky 인스턴스 (Interceptor & Token Logic)
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

```typescript
import { request } from '@/lib/api'

export const fetchUsers = async (page: number) => {
  return await request('users', {
    searchParams: { page },
  })
}

export const createUser = async (body: Partial<User>) => {
  return await request('users', {
    method: 'POST',
    json: body,
  })
}
```

**Step 2: TanStack Query 코로케이션 및 에러 처리 (`src/hooks/queries/*.ts`)**
**Query Key Factory Pattern**을 적용하여 키를 중앙 관리하고, 비즈니스 로직(useQuery)을 함께(Co-location) 작성합니다.

```typescript
import { useEffect } from 'react'
import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetchUsers, createUser } from '@/api/users'

export const userKeys = {
  all: ['users'] as const,
  list: (page: number) => [...userKeys.all, 'list', page] as const,
}

// 1. 명령형 훅 (데이터가 없을 수도 있음)
export const useUsers = (page: number) => {
  const query = useQuery({
    queryKey: userKeys.list(page),
    queryFn: () => fetchUsers(page),
  })

  // 훅 내부에서 백그라운드 에러 알림 처리
  useEffect(() => {
    if (query.isError) toast.error('데이터 로드 실패')
  }, [query.isError])

  return query
}

// 2. 선언적 훅 (데이터가 100% 존재함을 보장함)
export const useUsersSuspense = (page: number) => {
  return useSuspenseQuery({
    queryKey: userKeys.list(page),
    queryFn: () => fetchUsers(page),
  })
}
```

**Step 3: 명령형 렌더링 (Background Fetching 용도)**
화면 전체를 로딩으로 덮고 싶지 않거나, 백그라운드에서 데이터를 갱신할 때 사용하는 전통적인 방식입니다.

```tsx
import { useState } from 'react'
import { useUsers } from '@/hooks/queries/useUsers'

export function ImperativeUserList() {
  const [page, setPage] = useState(1)

  // 훅 내부에서 isLoading, isError 등을 전부 뽑아와야 합니다.
  const { data: users, isPending, isError, error } = useUsers(page)

  // 1. 에러 체크 UI
  if (isError) {
    return <div className="text-red-500">에러: {error.message}</div>
  }

  return (
    <div>
      {/* 2. 로딩 체크 UI */}
      {isPending ? (
        <div>로딩 중...</div>
      ) : (
        <ul>
          {/* 3. 데이터가 없을 수도 있으므로 옵셔널 체이닝(?) 필수 */}
          {users?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**Step 4: 선언적 렌더링 (초기 렌더링 블로킹 용도)**
React 18의 핵심 패턴입니다. `useSuspenseQuery`를 사용하면 컴포넌트 내부의 로딩/에러 체크 코드가 완전히 사라집니다. 로딩 상태는 부모의 `<Suspense>`가, 에러 상태는 `<ErrorBoundary>`가 낚아채어 처리합니다.

```tsx
// 터미널에서 pnpm add react-error-boundary 설치 필요
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useUsersSuspense } from '@/hooks/queries/useUsers'

// 1. 하위 컴포넌트: 에러/로딩 체크가 완벽히 사라진 동기적인 코드 모습
function DeclarativeUserList() {
  // useSuspenseQuery를 쓰면 data가 무조건 존재함을 보장합니다. (옵셔널 체이닝 불필요)
  const { data: users } = useUsersSuspense(1)

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}

// 2. 부모 래퍼 컴포넌트: 에러와 로딩을 선언적으로 위임받아 처리
export function UsersPage() {
  return (
    {/* 가장 바깥에서 에러를 캐치합니다 */}
    <ErrorBoundary fallback={<div className="text-red-500">데이터 로드 실패</div>}>
      {/* 데이터를 불러오는 동안 fallback(스켈레톤)을 보여줍니다 */}
      <Suspense fallback={<div className="animate-pulse">데이터 불러오는 중...</div>}>
        {/* 오직 "성공적으로 데이터를 가져온 상태"만 렌더링에 집중합니다 */}
        <DeclarativeUserList />
      </Suspense>
    </ErrorBoundary>
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
