# Especificação: tRPC com Next.js App Router

## 1. Visão Geral

Implementar tRPC como camada de API typesafe integrada com Next.js App Router e Server Components.

### Stack
- **API**: tRPC v11
- **Query Client**: TanStack Query v5
- **Framework**: Next.js 16 (App Router)

---

## 2. Estrutura de Arquivos

```
src/
├── app/
│   ├── api/trpc/[trpc]/
│   │   └── route.ts        # Route handler (GET/POST)
│   └── layout.tsx          # Adicionar TRPCProvider
├── server/
│   ├── api/
│   │   ├── root.ts         # AppRouter
│   │   ├── init.ts         # tRPC init (createTRPCContext, t)
│   │   └── routers/
│   │       ├── _app.ts     # Router base
│   │       └── submissions.ts  # Procedures de exemplo
│   └── trpc/
│       ├── client.ts       # TRPCProvider + getQueryClient
│       ├── server.ts       # Caller para Server Components
│       └── server-only.ts   # Marcação server-only
└── utils/
    └── trpc.ts             # createTRPCReact (se necessário)
```

---

## 3. Configuração

### 3.1 Instalação

```bash
npm install @trpc/server @trpc/client @trpc/react-query @tanstack/react-query server-only
npm install -D @types/server-only
```

### 3.2 Server Init (`server/api/init.ts`)

```typescript
import { initTRPC } from '@trpc/server';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  return { headers: headers() };
});

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
```

### 3.3 Route Handler (`app/api/trpc/[trpc]/route.ts`)

```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '~/server/api/init';
import { appRouter } from '~/server/api/root';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```

### 3.4 Client Setup (`server/trpc/client.ts`)

```typescript
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import type { AppRouter } from '~/server/api/root';

export const trpc = createTRPCReact<AppRouter>();

function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient();
  }
  return window.__queryClient;
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 3.5 Server Components (`server/trpc/server.ts`)

```typescript
import 'server-only';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createCallerFactory, createTRPCContext } from '~/server/api/init';
import { appRouter } from '~/server/api/root';

export const getQueryClient = cache(() => new QueryClient());
const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers(caller, getQueryClient);
```

### 3.6 Providers no Layout

```typescript
// app/layout.tsx
import { TRPCProvider } from '~/server/trpc/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
```

---

## 4. Criando Routers

### 4.1 Router Base (`server/api/routers/_app.ts`)

```typescript
import { createTRPCRouter } from '~/server/api/init';
import { submissionsRouter } from './submissions';

export const appRouter = createTRPCRouter({
  submissions: submissionsRouter,
});

export type AppRouter = typeof appRouter;
```

### 4.2 Router de Exemplo

```typescript
import { baseProcedure, createTRPCRouter } from '~/server/api/init';
import { z } from 'zod';

export const submissionsRouter = createTRPCRouter({
  create: baseProcedure
    .input(z.object({
      code: z.string(),
      language: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      return { id: 'uuid', ...input, createdAt: new Date() };
    }),

  getAll: baseProcedure.query(async ({ ctx }) => {
    return [];
  }),
});
```

---

## 5. Uso

### 5.1 Client Components

```tsx
'use client';
import { trpc } from '~/server/trpc/client';

export function SubmitButton() {
  const createMutation = trpc.submissions.create.useMutation();
  
  return <button onClick={() => createMutation.mutate({ code: '...', language: 'ts' })} />;
}
```

### 5.2 Server Components

```tsx
import { trpc, HydrateClient } from '~/server/trpc/server';

export default async function HomePage() {
  await trpc.submissions.getAll.prefetch();
  
  return (
    <HydrateClient>
      <main>...</main>
    </HydrateClient>
  );
}
```

---

## 6. To-Dos de Implementação

- [ ] **TASK-TRPC-001**: Instalar dependências (@trpc/server, @trpc/client, @trpc/react-query, @tanstack/react-query, server-only)
- [ ] **TASK-TRPC-002**: Criar `server/api/init.ts` (tRPC init + context)
- [ ] **TASK-TRPC-003**: Criar `server/api/root.ts` (AppRouter)
- [ ] **TASK-TRPC-004**: Criar route handler `app/api/trpc/[trpc]/route.ts`
- [ ] **TASK-TRPC-005**: Criar `server/trpc/client.ts` (TRPCProvider)
- [ ] **TASK-TRPC-006**: Criar `server/trpc/server.ts` (caller para RSC)
- [ ] **TASK-TRPC-007**: Adicionar TRPCProvider no `app/layout.tsx`
- [ ] **TASK-TRPC-008**: Criar router de exemplo (submissions)
- [ ] **TASK-TRPC-009**: Configurar variáveis de ambiente (NEXT_PUBLIC_APP_URL)
