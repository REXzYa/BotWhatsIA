# 🚀 Guia Rápido - Bot WhatsApp IA

## ⏱️ Instalação em 5 minutos

### **1. Pré-requisitos** (2 min)

```bash
# Verifique se tem Node.js instalado
node --version
# Deve retornar v18.x ou superior
```

Se não tiver: [Baixe aqui](https://nodejs.org/)

---

### **2. Instalar** (1 min)

```bash
# Clone e instale
git clone <seu-repo>
cd BotWhatsIA
npm install
```

---

### **3. Configurar** (1 min)

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

**Edite o `.env` e adicione sua chave:**

```ini
AI_PROVIDER=groq
GROQ_API_KEY=gsk_COLOQUE_SUA_CHAVE_AQUI
AI_MODEL=llama-3.1-70b-versatile
```

**Obter chave Groq (GRÁTIS):**
1. Acesse: https://console.groq.com/
2. Faça login com Google
3. Vá em "API Keys"
4. Copie a chave

---

### **4. Iniciar** (1 min)

```bash
npm start
```

**Escaneie o QR Code** que aparecer no terminal com seu WhatsApp.

---

### **5. Testar** (30 seg)

De **outro número**, envie para o bot:

```
oi
```

✅ Pronto! Seu bot está funcionando!

---

## 📱 Comandos Básicos

| Digite | O que acontece |
|--------|----------------|
| `oi` | Mostra o menu |
| `1` | Conversa com IA |
| `2` | Ver catálogo |
| `3` | Falar com atendente |
| `menu` | Volta ao menu (a qualquer momento) |
| `atendente` | Chama humano (a qualquer momento) |

---

## 🎨 Personalizar

### **Produtos do catálogo**

Edite: `src/modules/catalog/products.json`

### **Personalidade da IA**

Edite: `src/modules/ia/iaPrompt.js`

### **Menu principal**

Edite: `src/core/router.js` (linha 7)

---

## 🧪 Testar Sem WhatsApp

```bash
node test-local.js
```

Teste a lógica do bot sem conectar ao WhatsApp real.

---

## 🆘 Problemas?

### **QR Code não aparece**

```bash
rm -rf auth/
npm start
```

### **Bot não responde**

- Teste de **outro número** (não o mesmo conectado)
- Verifique se não está em grupo

### **Erro de API**

- Confira se a chave no `.env` está correta
- Groq: Teste em https://console.groq.com/playground

---

## 📚 Mais Informações

Leia o [README.md](README.md) completo para:
- Estrutura do projeto
- Criar novos módulos
- Deploy em produção
- FAQ completo

---

<div align="center">

**Dúvidas?** Consulte o [README.md](README.md) ou abra uma [Issue](../../issues)

</div>
