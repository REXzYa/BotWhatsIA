# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Bot WhatsApp IA**! 🎉

Este documento fornece diretrizes para contribuir com o projeto.

---

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)
- [Processo de Pull Request](#processo-de-pull-request)
- [Padrões de Código](#padrões-de-código)
- [Estrutura de Commits](#estrutura-de-commits)

---

## 🚀 Como Contribuir

### **1. Fork o Repositório**

Clique no botão "Fork" no GitHub para criar uma cópia do projeto.

### **2. Clone seu Fork**

```bash
git clone https://github.com/SEU-USUARIO/BotWhatsIA.git
cd BotWhatsIA
```

### **3. Crie uma Branch**

```bash
git checkout -b feature/nome-da-funcionalidade
```

**Tipos de branches:**
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Atualização de documentação
- `refactor/` - Refatoração de código
- `test/` - Adicionar/modificar testes

### **4. Faça suas Alterações**

Desenvolva sua contribuição seguindo os [Padrões de Código](#padrões-de-código).

### **5. Teste Localmente**

```bash
# Teste o modo local
node test-local.js

# Teste com WhatsApp real (se possível)
npm start
```

### **6. Commit suas Mudanças**

```bash
git add .
git commit -m "feat: adiciona módulo de agendamento"
```

Veja [Estrutura de Commits](#estrutura-de-commits) para padrões.

### **7. Push para seu Fork**

```bash
git push origin feature/nome-da-funcionalidade
```

### **8. Abra um Pull Request**

Vá ao GitHub e clique em "New Pull Request".

---

## 🐛 Reportar Bugs

### **Antes de Reportar**

1. ✅ Verifique se já não existe uma [Issue aberta](../../issues)
2. ✅ Teste na versão mais recente do projeto
3. ✅ Verifique a documentação (README.md)

### **Como Reportar**

Abra uma [Nova Issue](../../issues/new) com:

**Título:** Descrição curta e clara do bug

**Conteúdo:**

```markdown
## Descrição do Bug
[Descreva claramente o problema]

## Passos para Reproduzir
1. Faça X
2. Clique em Y
3. Veja o erro Z

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Ambiente
- OS: [Windows 11 / Ubuntu 22.04 / macOS 14]
- Node.js: [v20.10.0]
- Versão do Bot: [v1.0.0]

## Logs de Erro
```
[Cole aqui os logs relevantes]
```

## Screenshots (se aplicável)
[Adicione capturas de tela]
```

---

## 💡 Sugerir Melhorias

### **Ideias Bem-Vindas**

- ✅ Novos módulos (agendamento, pagamento, etc.)
- ✅ Integrações com serviços externos
- ✅ Melhorias de performance
- ✅ Melhorias na documentação
- ✅ Novos exemplos e tutoriais

### **Como Sugerir**

Abra uma [Nova Issue](../../issues/new) com label `enhancement`:

**Título:** feat: [Nome da funcionalidade]

**Conteúdo:**

```markdown
## Descrição da Funcionalidade
[Descreva a melhoria proposta]

## Problema que Resolve
[Qual problema isso resolve?]

## Solução Proposta
[Como você imagina que funcione?]

## Alternativas Consideradas
[Outras formas de resolver?]

## Exemplos de Uso
```javascript
// Como seria usado
```

## Impacto
- [ ] Breaking change (requer atualização de código existente)
- [ ] Requer nova dependência
- [ ] Requer mudança na documentação
```

---

## 🔄 Processo de Pull Request

### **Checklist antes de Enviar**

- [ ] Código testado localmente
- [ ] Testes automatizados passam (se aplicável)
- [ ] Código segue os [Padrões](#padrões-de-código)
- [ ] Documentação atualizada (README, comentários)
- [ ] Commit messages seguem o padrão
- [ ] Branch atualizada com `main`:
  ```bash
  git pull origin main
  git rebase main
  ```

### **Template do Pull Request**

```markdown
## Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova funcionalidade
- [ ] 📝 Atualização de documentação
- [ ] ♻️ Refatoração
- [ ] 🧪 Testes

## Descrição
[Descreva suas mudanças]

## Issue Relacionada
Closes #[número da issue]

## Como Testar
1. [Passo 1]
2. [Passo 2]
3. [Verificar resultado]

## Checklist
- [ ] Testei localmente
- [ ] Adicionei/atualizei testes
- [ ] Atualizei documentação
- [ ] Código segue os padrões do projeto

## Screenshots (se visual)
[Adicione screenshots]
```

### **Processo de Revisão**

1. Maintainer revisa o código
2. Pode solicitar mudanças
3. Você atualiza o PR conforme feedback
4. Aprovado → Merge para `main`

---

## 📝 Padrões de Código

### **JavaScript/ES6+**

```javascript
// ✅ BOM
export async function handleMessage(chatId, message) {
  const normalized = message.trim().toLowerCase();
  
  if (!normalized) {
    return;
  }
  
  await sendResponse(chatId, 'Resposta');
}

// ❌ EVITAR
function handle(c, m) {
  let n = m.trim().toLowerCase()
  if (n == '') return
  sendResponse(c, 'Resposta')
}
```

### **Convenções**

- ✅ Use **ES Modules** (`import`/`export`)
- ✅ Use **async/await** (não callbacks)
- ✅ Use **const** por padrão, **let** quando necessário
- ✅ Nomes descritivos de variáveis
- ✅ Funções com único propósito (Single Responsibility)
- ✅ Comentários claros em lógica complexa
- ❌ Evite `var`
- ❌ Evite funções muito grandes (>50 linhas)

### **Estrutura de Arquivos**

```
src/modules/novoModulo/
├── novoModuloController.js   # Lógica principal (export functions)
├── novoModuloService.js      # Serviços/helpers (opcional)
└── dados.json                # Dados (se necessário)
```

### **Nomenclatura**

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| **Arquivos** | camelCase.js | `catalogController.js` |
| **Funções** | camelCase | `handleMessage()` |
| **Constantes** | UPPER_CASE | `WELCOME_MESSAGE` |
| **Classes** | PascalCase | `MessageRouter` |

### **Logs**

```javascript
// Use o logger centralizado
import logger from '../utils/logger.js';

logger.info({ from, text }, 'Mensagem recebida');
logger.error({ err }, 'Erro ao processar');
logger.debug({ data }, 'Debug info');
```

---

## 📜 Estrutura de Commits

Seguimos o padrão **Conventional Commits**:

```
tipo(escopo): descrição curta

[corpo opcional]

[footer opcional]
```

### **Tipos**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(catalog): adiciona filtro por categoria` |
| `fix` | Correção de bug | `fix(router): corrige detecção de saudações` |
| `docs` | Documentação | `docs(readme): atualiza guia de instalação` |
| `style` | Formatação | `style: ajusta indentação` |
| `refactor` | Refatoração | `refactor(ai): simplifica lógica de retry` |
| `test` | Testes | `test(router): adiciona testes unitários` |
| `chore` | Manutenção | `chore: atualiza dependências` |

### **Exemplos**

```bash
# Nova funcionalidade
git commit -m "feat(agendamento): adiciona módulo de agendamento de horários"

# Correção de bug
git commit -m "fix(bot): corrige filtro de grupos que não funcionava"

# Documentação
git commit -m "docs: adiciona guia de contribuição"

# Breaking change
git commit -m "feat(router)!: altera estrutura de módulos

BREAKING CHANGE: Módulos agora precisam exportar init()
```

---

## 🎯 Áreas para Contribuir

### **Fácil (Good First Issue)**

- 📝 Melhorar documentação
- 🐛 Corrigir typos
- ✨ Adicionar exemplos de uso
- 🌍 Traduzir para outros idiomas

### **Intermediário**

- 🔧 Novos módulos (pagamento, localização)
- 🎨 Melhorias de UX nas mensagens
- 📊 Sistema de analytics
- 🧪 Adicionar testes automatizados

### **Avançado**

- 🚀 Otimização de performance
- 🔐 Melhorias de segurança
- 📦 Integração com bancos de dados
- 🌐 API REST para gerenciar o bot

---

## 📞 Dúvidas?

- 💬 Abra uma [Discussion](../../discussions)
- 📧 Entre em contato com maintainers
- 📚 Leia a [Documentação Completa](README.md)

---

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a **MIT License**.

---

<div align="center">

**Obrigado por tornar este projeto melhor! 🙌**

</div>
