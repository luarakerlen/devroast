# DevRoast - Agentes

## Visão Geral
Plataforma de code roasting - cole seu código e receba uma análise divertida e crítica.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: CSS Modules
- **Syntax Highlighting**: Shiki

## Estrutura de Componentes

### UI Components (`src/components/ui/`)
Cada componente em sua própria pasta:
```
button/
├── button.tsx
└── button.module.css
```

### Page Components (`src/components/home/`)
Componentes específicos das páginas.

## Padrões

### CSS Modules
- Usar CSS custom properties em `globals.css` para cores e espaçamentos
- Classes no formato `.className`
- Variáveis: `--bg-page`, `--text-primary`, `--accent-green`, etc.

### Nomenclatura
- Componentes: PascalCase
- Arquivos: kebab-case
- CSS Modules: `.module.css`

### Compound Components
Componentes com partes reutilizáveis usam padrão de composição:
- `BadgeRoot`, `BadgeDot`, `BadgeLabel`
- `CodeBlockRoot`, `CodeBlockHeader`, `CodeBlockContent`

## Scripts
- `npm run dev` - Desenvolvimento
- `npm run build` - Build produção
- `npm run check` - Lint e typecheck
