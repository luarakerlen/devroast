# UI Components - Padrões e Convenções

## Visão Geral

Componentes reutilizáveis da interface, localizados em `src/components/ui/`.

## Estrutura de Arquivos

Cada componente em sua própria pasta:

```
src/components/ui/
├── button/
│   ├── button.tsx
│   └── button.module.css
├── badge/
│   ├── badge.tsx
│   └── badge.module.css
```

## Tech Stack

- **Estilização**: CSS Modules
- **Framework**: React com TypeScript
- **Imports**: `@/*` path alias

## Padrões

### 1. Nome de Arquivos

- Usar kebab-case: `button.tsx`, `card.tsx`
- Um componente por arquivo
- Exports nomeados (preferir `export function`)

### 2. CSS Modules

```css
/* Nome do arquivo: component.module.css */

.container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Usar CSS custom properties para cores */
.element {
  background: var(--bg-page);
  color: var(--text-secondary);
}
```

### 3. Template de Componente

```tsx
// button/button.tsx
import styles from './button.module.css';

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className ?? ''}`} {...props}>
      {children}
    </button>
  );
}
```

### 4. Compound Components

Componentes com partes reutilizáveis usam padrão de composição:

```tsx
// badge/badge.tsx
export function BadgeRoot({ children, className }: BadgeProps) {
  return <span className={`${styles.root} ${className}`}>{children}</span>;
}

export function BadgeDot() {
  return <span className={styles.dot} />;
}

export function BadgeLabel({ children }: { children: React.ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}

// Uso:
// <BadgeRoot><BadgeDot /><BadgeLabel>Label</BadgeLabel></BadgeRoot>
```

### 5. Imports

```tsx
// ✅ CORRETO - Usar path alias
import { Button } from '@/components/ui/button';
import styles from './button.module.css';

// ❌ ERRADO
import { Button } from '../ui/button';
```

### 6. Props

- Interfaces nomeadas com sufixo `Props`
- Extender tipos nativos quando apropriado

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}
```
