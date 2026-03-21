# Specs - Formato de Especificação

## Estrutura de uma Spec

Cada spec deve seguir este formato:

```markdown
# Especificação: [Nome da Feature]

## 1. Visão Geral
Breve descrição do problema e solução.

## 2. [Seção Principal]
Dependendo da feature: pesquisa de opções, modelo de dados, fluxos, etc.

## 3. To-Dos de Implementação

- [ ] **TASK-XXX-001**: Descrição da tarefa
- [ ] **TASK-XXX-002**: Descrição da tarefa
```

## Regras

1. **Nome do arquivo**: kebab-case (ex: `drizzle-setup.md`)
2. **To-Dos**: Formato `**TASK-COD-XXX**` onde COD = código da feature
3. **Tabelas**: Usar markdown tables para schemas/compareções
4. **Código**: Syntax highlighting com ```typescript, ```yaml, etc.
5. **Estrutura de arquivos**: Incluir seção com tree da estrutura quando aplicável
6. **Concisão**: Remover seções vazias se não aplicarem
