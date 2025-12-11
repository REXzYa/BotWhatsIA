# 🧪 Guia de Teste - Sistema de Licenças

Este guia mostra como testar o sistema de licenciamento de módulos.

---

## 📋 O que foi implementado?

### ✅ Arquivos Criados/Modificados:

1. **`src/core/license.js`** - Sistema completo de licenças
2. **`src/core/bot.js`** - Integração com verificação ao iniciar
3. **`src/core/router.js`** - Checagem antes de acessar módulos
4. **`license.json`** - Arquivo de configuração de licença

---

## 🎯 Como Funciona?

### **1. Ao Iniciar o Bot**

O sistema:
- ✅ Carrega `license.json`
- ✅ Valida a licença (tipo, expiração, chave)
- ✅ Exibe no console quais módulos estão ativos
- ✅ Lista módulos bloqueados disponíveis para compra
- ✅ Armazena em `global.botLicense` para acesso do router

### **2. Quando Usuário Tenta Acessar Módulo**

O router:
- ✅ Verifica se módulo está ativo em `license.json`
- ✅ Se **ATIVO**: Permite acesso normal
- ✅ Se **BLOQUEADO**: Envia mensagem de venda

---

## 🧪 Cenários de Teste

### **Teste 1: Licença DEMO (Padrão)**

**Arquivo:** `license.json` (atual)

```json
{
  "licenca": {
    "tipo": "demo"
  },
  "modulos": [
    { "id": "ia", "ativo": true },
    { "id": "catalogo", "ativo": true },
    { "id": "agendamento", "ativo": false }
  ]
}
```

**Resultado Esperado:**
- ✅ IA funciona
- ✅ Catálogo funciona
- ❌ Agendamento bloqueado (mensagem de venda)

**Como Testar:**
```bash
npm start
```

No console verá:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📜 INFORMAÇÕES DA LICENÇA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆓 Tipo: DEMO
✅ Status: Modo DEMO - Apenas módulos base disponíveis

📦 Módulos Ativos (2):
   ✓ Chatbot IA (v1.0.0)
   ✓ Catálogo de Produtos (v1.0.0)

🔒 Módulos Disponíveis para Compra (8):
   ✗ Agendamento de Serviços
   ...
```

---

### **Teste 2: Bloquear Catálogo**

Simule um cliente que não comprou o catálogo.

**Edite `license.json`:**
```json
{
  "modulos": [
    { "id": "ia", "ativo": true },
    { "id": "catalogo", "ativo": false, "requer_pagamento": true }
  ]
}
```

**Como Testar:**
1. Reinicie o bot: `npm start`
2. No WhatsApp, envie: `2` (catálogo)

**Resultado Esperado:**
```
🔒 Módulo Bloqueado

📦 Catálogo de Produtos
Exibição de produtos com imagens e preços

💡 Este módulo não está ativo em sua licença.

Para ativar, visite:
👉 [SEU_SITE_DE_VENDAS]
```

---

### **Teste 3: Licença Vitalícia (Cliente Premium)**

**Edite `license.json`:**
```json
{
  "licenca": {
    "chave": "VIT-ABC123-XYZ789",
    "tipo": "vitalicia",
    "expiracao": "vitalicia",
    "cliente": {
      "nome": "João Silva",
      "email": "joao@email.com",
      "cnpj": "12.345.678/0001-90"
    }
  },
  "modulos": [
    { "id": "ia", "ativo": true },
    { "id": "catalogo", "ativo": true },
    { "id": "agendamento", "ativo": true },
    { "id": "restaurante", "ativo": true },
    { "id": "leads", "ativo": true }
  ]
}
```

**Resultado Esperado:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📜 INFORMAÇÕES DA LICENÇA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 Tipo: VITALICIA
👤 Cliente: João Silva
✅ Status: Licença válida

📦 Módulos Ativos (5):
   ✓ Chatbot IA (v1.0.0)
   ✓ Catálogo de Produtos (v1.0.0)
   ✓ Agendamento de Serviços (v1.0.0)
   ✓ Pedidos para Restaurantes (v1.0.0)
   ✓ Captura de Leads (v1.0.0)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### **Teste 4: Licença Expirada**

**Edite `license.json`:**
```json
{
  "licenca": {
    "chave": "MENS-ABC123",
    "tipo": "mensal",
    "expiracao": "2024-01-01"
  }
}
```

**Resultado Esperado:**
```
❌ Status: Licença EXPIRADA em 01/01/2024

⚠️ Limitações:
   • Apenas módulos base continuarão funcionando
```

---

## 🔧 Testar com test-local.js

Você pode testar sem conectar no WhatsApp:

```bash
node test-local.js
```

**Comandos para testar:**
```
> 2
[Deve mostrar catálogo OU mensagem de bloqueio]

> catalogo
[Deve mostrar catálogo OU mensagem de bloqueio]

> prod-001
[Deve mostrar produto OU mensagem de bloqueio]
```

---

## 📝 Funções Disponíveis

### **No código (src/core/license.js):**

```javascript
import { 
  loadLicense,           // Carrega license.json
  validateLicense,       // Valida licença
  isModuleActive,        // Verifica se módulo está ativo
  getModuleInfo,         // Pega info do módulo
  getActiveModules,      // Lista todos ativos
  displayLicenseInfo,    // Exibe info no console
  getModuleBlockedMessage // Mensagem de bloqueio
} from './core/license.js';
```

### **Exemplo de Uso:**

```javascript
// No seu código
const license = loadLicense();

if (isModuleActive('agendamento', license)) {
  // Permite acesso
  await handleAgendamento();
} else {
  // Bloqueia e mostra mensagem de venda
  const msg = getModuleBlockedMessage('agendamento', license);
  await sendWhatsApp(chatId, msg);
}
```

---

## 🎨 Personalizar Mensagens de Bloqueio

**Edite:** `src/core/license.js` (linha ~273)

```javascript
export function getModuleBlockedMessage(moduleId, license) {
  const info = getModuleInfo(moduleId, license);
  
  return `🔒 *Módulo Bloqueado*

📦 *${info.nome}*
${info.descricao}

💡 Este módulo não está ativo em sua licença.

Para ativar, visite:
👉 [SEU_SITE_DE_VENDAS]        // ← TROQUE AQUI

Ou entre em contato:
📱 WhatsApp: (XX) XXXXX-XXXX   // ← TROQUE AQUI`;
}
```

---

## 🚀 Próximos Passos

### **1. Criar Módulos Futuros**

Quando criar um novo módulo (ex: `agendamento`):

```javascript
// src/modules/agendamento/agendamentoController.js
export async function handleAgendamento(chatId) {
  const license = global.botLicense;
  
  // Verifica se está ativo
  if (!isModuleActive('agendamento', license)) {
    const msg = getModuleBlockedMessage('agendamento', license);
    await global.sendWhatsApp(chatId, msg);
    return;
  }
  
  // Lógica do módulo aqui
  await global.sendWhatsApp(chatId, '📅 Agendamento...');
}
```

### **2. Sistema de Ativação de Licenças**

Para quando o cliente comprar:

```javascript
// Função para ativar módulo após pagamento
export function activateModule(moduleId) {
  const license = loadLicense();
  
  const modulo = license.modulos.find(m => m.id === moduleId);
  if (modulo) {
    modulo.ativo = true;
    
    // Salva no arquivo
    fs.writeFileSync(LICENSE_PATH, JSON.stringify(license, null, 2));
    
    return true;
  }
  return false;
}
```

### **3. Webhook de Pagamento**

Quando vender via Hotmart/Kiwify:

```javascript
// Endpoint que recebe webhook
app.post('/webhook/ativacao', (req, res) => {
  const { cliente_email, modulo_id, transacao_status } = req.body;
  
  if (transacao_status === 'aprovado') {
    // Busca licença do cliente por email
    const license = findLicenseByEmail(cliente_email);
    
    // Ativa o módulo
    activateModule(modulo_id, license);
    
    // Envia email de confirmação
    sendConfirmationEmail(cliente_email);
  }
  
  res.json({ success: true });
});
```

---

## ✅ Checklist de Implementação

- [x] Sistema de licenças criado
- [x] Verificação ao iniciar bot
- [x] Bloqueio no router (catálogo)
- [x] Mensagens de venda personalizadas
- [x] Exibição de info no console
- [ ] Criar módulos futuros (agendamento, etc)
- [ ] Sistema de ativação automática
- [ ] Webhook de pagamento
- [ ] Painel admin de licenças

---

## 📞 Dúvidas?

Se algo não funcionar:

1. Verifique se `license.json` existe na raiz
2. Veja o console ao iniciar o bot
3. Teste com `test-local.js` primeiro
4. Confira os logs em `logs/`

---

**Pronto! Sistema de licenças funcionando! 🎉**
