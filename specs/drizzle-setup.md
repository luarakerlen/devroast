# Especificação: Drizzle ORM com Docker Compose

## 1. Visão Geral

Esta especificação define a estrutura de banco de dados para o DevRoast usando Drizzle ORM e PostgreSQL com Docker Compose.

### Stack
- **ORM**: Drizzle ORM
- **Banco**: PostgreSQL
- **Container**: Docker Compose

---

## 2. Tabelas

### 2.1 `submissions` (Submissões de Código)

Tabela principal que armazena os códigos submetidos para roast.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | ID único da submissão |
| `code` | `text` | Código fonte submetido |
| `language` | `varchar(50)` | Linguagem de programação |
| `created_at` | `timestamp` | Data de criação |

### 2.2 `roasts` (Resultados do Roast)

Armazena os resultados do roast gerado pela IA.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | ID único do roast |
| `submission_id` | `uuid` | FK para submissions |
| `content` | `text` | Texto do roast |
| `score` | `integer` | Score de "vergonha" (0-100) |
| `mode` | `roast_mode_enum` | Modo do roast (normal/sarcastic) |
| `provider` | `ai_provider_enum` | Provider de IA usado |
| `model` | `varchar(100)` | Modelo específico da IA |
| `created_at` | `timestamp` | Data de criação |

### 2.3 `leaderboard` (Ranking)

Tabela para o leaderboard da vergonha - rankings agregados.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | ID único |
| `submission_id` | `uuid` | FK para submissions |
| `roast_id` | `uuid` | FK para roasts |
| `rank_position` | `integer` | Posição no ranking |
| `period` | `varchar(20)` | Período (daily/weekly/all_time) |
| `created_at` | `timestamp` | Data de criação |

---

## 3. Enums

### 3.1 `roast_mode_enum`

```typescript
enum RoastMode {
  NORMAL = 'normal',     // Modo padrão
  SARCASIC = 'sarcastic' // Modo sarcástico máximo
}
```

### 3.2 `ai_provider_enum`

```typescript
enum AiProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  OLLAMA = 'ollama',     // IA local
  LM_STUDIO = 'lm_studio' // IA local
}
```

### 3.3 `programming_language_enum`

```typescript
enum ProgrammingLanguage {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  CSHARP = 'csharp',
  GO = 'go',
  RUST = 'rust',
  PHP = 'php',
  RUBY = 'ruby',
  SWIFT = 'swift',
  KOTLIN = 'kotlin',
  CPP = 'cpp',
  C = 'c',
  HTML = 'html',
  CSS = 'css',
  SQL = 'sql',
  BASH = 'bash',
  OTHER = 'other'
}
```

---

## 4. Docker Compose

### 4.1 Configuração

Arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast_password
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 4.2 Variáveis de Ambiente

Adicionar ao `.env`:

```env
DATABASE_URL=postgresql://devroast:devroast_password@localhost:5432/devroast
```

---

## 5. To-Dos de Implementação

- [ ] **TASK-DB-001**: Criar arquivo `docker-compose.yml` com PostgreSQL
- [ ] **TASK-DB-002**: Configurar arquivo `.env` com DATABASE_URL
- [ ] **TASK-DB-003**: Instalar dependências Drizzle (`drizzle-orm`, `drizzle-kit`, `postgres`)
- [ ] **TASK-DB-004**: Criar arquivo `db/config.ts` com configuração de conexão
- [ ] **TASK-DB-005**: Criar arquivo `db/schema.ts` com definições de tabelas e enums
- [ ] **TASK-DB-006**: Criar arquivo `db/index.ts` para exportar schema e cliente
- [ ] **TASK-DB-007**: Configurar script `db:push` no package.json para criar tabelas
- [ ] **TASK-DB-008**: Criar arquivo `db/seed.ts` com dados de exemplo (opcional)
- [ ] **TASK-DB-009**: Configurar migrations com Drizzle Kit

---

## 6. Estrutura de Arquivos

```
src/
└── db/
    ├── config.ts      # Configuração de conexão
    ├── schema.ts      # Definições de tabelas e enums
    ├── index.ts       # Exportações do banco
    └── migrations/    # Migrations do Drizzle Kit
```

---

## 7. Considerações

1. **Sem autenticação**: O sistema é anónimo, não há necessidade de tabela de usuários
2. **Persistência total**: Códigos e resultados são armazenados para o leaderboard
3. **Scores**: Armazenados na tabela `roasts` para permitir ranking por período
