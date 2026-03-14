# Especificação: Editor de Código com Syntax Highlighting

## 1. Pesquisa de Opções

### Opções Analisadas

| Biblioteca | Tipo | Detecção Automática de Linguagem | Prós | Contras |
|------------|------|--------------------------------|------|---------|
| **Shiki** (atual) | Highlighter only | Não | Excelente qualidade de highlighting, temas VS Code, já está no projeto | Apenas rendering, não é editável |
| **Monaco Editor** | Editor completo | Sim | IntelliSense, autocomplete, temas, muito robusto | Pesado (~3MB), complexidade alta |
| **React Simple Code Editor** | Editor leve | Não | Leve, simples | Funcionalidades limitadas |
| **React Syntax Highlighter** | Highlighter | Não | Fácil de usar, muitos temas | Mais antigo, menos flexible |
| **Highlight.js** | Highlighter | **Sim** | Auto-detecção de linguagem, muito popular | Foco em highlighting, não é editável |

### Análise do Ray-So

O Ray-So (ray.so) é construído com:
- **Next.js** como framework
- **Tailwind CSS** para estilização
- **Shiki** para syntax highlighting (similar ao nosso uso atual)
- Não é um editor editável em tempo real - é focado em criar imagens de código

O Ray-So não oferece edição de código - apenas rendering para geração de imagens.

---

## 2. Recomendação

### Abordagem Híbrida Recomendada

Para o DevRoast, recomendamos:

1. **Para input de código**: Usar um `textarea` simples com numeração de linhas (como já implementado)
2. **Para rendering/análise**: Usar **Shiki** (já no projeto) para highlight quando o código for submetido
3. **Detecção de linguagem**: Usar **Highlight.js** apenas para detectar a linguagem automaticamente

### Por que não Monaco?

O Monaco Editor é muito robusto mas:
- Tamanho grande (~3MB)
- Complexidade alta para integrar
- Exagero para o caso de uso do DevRoast (não precisamos de IntelliSense)

---

## 3. Especificação Técnica

### Funcionalidades Required

- [ ] Campo de input para código (textarea com numeração de linhas)
- [ ] Seleção manual de linguagem (dropdown)
- [ ] Detecção automática de linguagem (usando Highlight.js)
- [ ] Syntax highlighting em tempo real ou sob demanda
- [ ] Suporte às linguagens mais populares (JS, TS, Python, Java, C#, Go, Rust, etc.)

### Fluxo do Usuário

1. Usuário cola/escreve código no editor
2. Sistema detecta automaticamente a linguagem (ou usuário seleciona manualmente)
3. Código é destacado com syntax highlighting
4. Código é enviado para "roast"

### Detecção de Linguagem

- Usar `highlight.js` para detectar linguagem automaticamente
- Permitir override manual via dropdown
- Mostrar linguagem detectada ao usuário

### Lista de Linguagens Suportadas (prioridade alta)

1. JavaScript
2. TypeScript
3. Python
4. Java
5. C#
6. Go
7. Rust
8. PHP
9. Ruby
10. Swift
11. Kotlin
12. C/C++
13. HTML
14. CSS
15. SQL
16. Shell/Bash

---

## 4. To-Dos de Implementação

- [ ] **TASK-001**: Adicionar `highlight.js` como dependência
- [ ] **TASK-002**: Criar componente `LanguageSelector` (dropdown)
- [ ] **TASK-003**: Implementar detecção automática de linguagem
- [ ] **TASK-004**: Integrar Shiki para renderização com highlight
- [ ] **TASK-005**: Atualizar `CodeInputArea` para suportar linguagem
- [ ] **TASK-006**: Adicionar estado de "linguagem detectada"

---

## 5. Perguntas para Esclarecimento

1. **Quando aplicar o highlight?** 
   - Em tempo real enquanto digita (pode ser custoso) 
   - Apenas quando o usuário clicar em "roast" (mais performático)
   
2. **O highlight precisa ser editável?**
   - O campo de input pode continuar sendo textarea simples
   - O highlight seria apenas para visualização/prévia

3. **Quantas linguagens precisamos suportar inicialmente?**
   - Todas as que Highlight.js suporta (190+)
   - Apenas um conjunto menor das mais populares?

4. **O input precisa de recursos avançados como autocomplete?**
   - Se sim, considerar Monaco Editor
   - Se não, textarea simples resolve
