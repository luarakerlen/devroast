# tRPC Server - Padrões e Convenções

## Visão Geral

tRPC v11 integrado com Next.js 16 App Router, TanStack Query v5 e Server Components.

## Estrutura de Arquivos

```
src/server/
├── api/
│   ├── init.ts          # tRPC init (createTRPCContext, t, baseProcedure)
│   ├── root.ts          # AppRouter
│   └── routers/
│       └── metrics.ts   # Router de exemplo
├── trpc/
│   ├── caller.ts        # Caller para Server Components
│   ├── client.tsx       # TRPCProvider (client component)
│   └── server.ts       # Helpers para RSC (trpc, HydrateClient)
```

## Criando um Router

### 1. Definir procedures no `init.ts`

```typescript
// src/server/api/init.ts
import { initTRPC } from '@trpc/server';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
  return {};
});

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
```

### 2. Criar o Router

```typescript
// src/server/api/routers/metrics.ts
import { avg, count } from 'drizzle-orm';
import { db } from '@/db';
import { roasts } from '@/db/schema';
import { baseProcedure, createTRPCRouter } from '../init';

export const metricsRouter = createTRPCRouter({
  getStats: baseProcedure.query(async () => {
    const [[totalResult], [avgResult]] = await Promise.all([
      db.select({ count: count() }).from(roasts),
      db.select({ avg: avg(roasts.score) }).from(roasts),
    ]);

    return {
      totalRoasted: totalResult?.count ?? 0,
      avgScore: avgResult?.avg ? Number(avgResult.avg) / 10 : 0,
    };
  }),
});
```

### 2.1 Queries Paralelas

Sempre usar `Promise.all` para executar queries independentes em paralelo:

```typescript
// ✅ CORRETO - Queries executam em paralelo
const [results, [totalResult]] = await Promise.all([
  db.select({ ... }).from(table1).limit(3),
  db.select({ count: count() }).from(table2),
]);

// ❌ ERRADO - Queries executam sequencialmente
const results = await db.select({ ... }).from(table1);
const [totalResult] = await db.select({ count: count() }).from(table2);
```

### 3. Registrar no AppRouter

```typescript
// src/server/api/root.ts
import { createTRPCRouter } from './init';
import { metricsRouter } from './routers/metrics';

export const appRouter = createTRPCRouter({
  metrics: metricsRouter,
});

export type AppRouter = typeof appRouter;
```

## Uso em Server Components

```tsx
// src/server/trpc/caller.ts
import 'server-only';
import { createCallerFactory, createTRPCContext } from '~/server/api/init';
import { appRouter } from '~/server/api/root';

export const createCaller = createCallerFactory(appRouter);
export const createContext = createTRPCContext;

// Uso em componentes:
import { createCaller, createContext } from '~/server/trpc/caller';

async function ServerComponent() {
  const caller = createCaller(await createContext());
  const data = await caller.metrics.getStats();
  return <Metrics {...data} />;
}
```

## Suspense Pattern

Sempre usar Suspense com skeleton para loading states:

```tsx
export function ComponentWithData() {
  return (
    <Suspense fallback={<ComponentSkeleton />}>
      <ServerDataFetcher />
    </Suspense>
  );
}
```

## Client Components

Para interações client-side (mutations, etc):

```tsx
'use client';
import { trpc } from '~/server/trpc/client';

export function SubmitButton() {
  const mutation = trpc.submissions.create.useMutation();
  
  return <button onClick={() => mutation.mutate({ code: '...', language: 'ts' })} />;
}
```
