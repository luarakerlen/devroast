# Home Components - Padrões e Convenções

## Visão Geral

Componentes específicos da página inicial (`/`), localizados em `src/components/home/`.

## Estrutura de Arquivos

Cada componente em sua própria pasta:

```
src/components/home/
├── footer-hint/
│   ├── footer-hint.tsx
│   └── footer-hint.module.css
├── hero-title/
│   ├── hero-title.tsx
│   └── hero-title.module.css
```

## Padrões

### 1. Server Components com Data Fetching

Para componentes que buscam dados do banco/API:

```tsx
// componentes com Suspense para loading states
import { Suspense } from 'react';
import { createCaller, createContext } from '~/server/trpc/caller';

async function ComponentServer() {
  const caller = createCaller(await createContext());
  const data = await caller.someRouter.getData();
  return <ComponentContent {...data} />;
}

export function ComponentSkeleton() {
  return <div className={styles.skeleton}>Loading...</div>;
}

export function Component() {
  return (
    <Suspense fallback={<ComponentSkeleton />}>
      <ComponentServer />
    </Suspense>
  );
}
```

### 2. NumberFlow para Animações de Números

Usar `@number-flow/react` para animação de números:

```tsx
import NumberFlow from '@number-flow/react';

function MetricDisplay({ value }: { value: number }) {
  return (
    <span>
      <NumberFlow value={value} />
    </span>
  );
}
```

### 3. CSS Modules

```css
/* Usar CSS custom properties do globals.css */
.container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-tertiary);
}

/* Skeleton loading */
.skeleton {
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

## Exemplo: FooterHint

```tsx
// footer-hint/footer-hint.tsx
import { Suspense } from 'react';
import NumberFlow from '@number-flow/react';
import { createCaller, createContext } from '~/server/trpc/caller';
import styles from './footer-hint.module.css';

async function FooterHintServer() {
  const caller = createCaller(await createContext());
  const stats = await caller.metrics.getStats();
  return <FooterHintContent {...stats} />;
}

function FooterHintContent({ totalRoasted, avgScore }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.stat}>
        <NumberFlow value={totalRoasted} /> codes roasted
      </span>
      <span className={styles.dot}>·</span>
      <span className={styles.stat}>
        avg score: <NumberFlow value={avgScore} /> /10
      </span>
    </div>
  );
}

export function FooterHintSkeleton() {
  return (
    <div className={styles.container}>
      <span className={`${styles.skeleton} ${styles.value}`} />
      <span className={`${styles.skeleton} ${styles.dot}`} />
      <span className={`${styles.skeleton} ${styles.label}`} />
    </div>
  );
}

export function FooterHint() {
  return (
    <Suspense fallback={<FooterHintSkeleton />}>
      <FooterHintServer />
    </Suspense>
  );
}
```
