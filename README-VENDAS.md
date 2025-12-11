# 🤖 Bot WhatsApp com IA + Catálogo | Script Pronto

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Baileys](https://img.shields.io/badge/Baileys-6.6.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Price](https://img.shields.io/badge/Price-R$29.90-success)

**Automatize seu atendimento no WhatsApp com Inteligência Artificial** 🚀

[🛒 Comprar Agora](#-como-comprar) • [📖 Documentação](#-funcionalidades) • [💡 Demo](#-demonstração)

</div>

---

## 🎯 O que é?

**Bot profissional de WhatsApp** com Inteligência Artificial e Catálogo de Produtos integrados. Script completo, documentado e pronto para instalar no seu servidor.

### ✨ Principais Características

- 🤖 **IA Conversacional** (GPT-4 ou Llama 3.1)
- 📦 **Catálogo Digital** com imagens e preços
- 🎛️ **Menu Interativo** inteligente
- 🔄 **Transferência para Humano** quando necessário
- 🛡️ **Filtro Anti-Grupos** automático
- 📝 **Logs Estruturados** para debug
- 🧪 **Modo de Teste** sem usar WhatsApp

---

## 🚀 Funcionalidades

### 🤖 **Chatbot com Inteligência Artificial**

```
✅ Responde perguntas automaticamente 24/7
✅ Usa GPT-4 (OpenAI) ou Llama 3.1 (Groq)
✅ Personalização total da personalidade
✅ Sistema de intenções inteligente
✅ Comandos globais (menu, atendente)
```

### 📦 **Catálogo de Produtos Completo**

```
✅ Exibe produtos com imagens
✅ Preços formatados em R$
✅ Navegação por números (1, 2, 3...)
✅ Atualização fácil via JSON
✅ Descrições detalhadas
```

### 🎛️ **Sistema de Roteamento Inteligente**

```
✅ Menu interativo automático
✅ Detecção de saudações (oi, olá, bom dia)
✅ Atalhos globais (menu, voltar, atendente)
✅ Roteamento por intenção
✅ Fallback para IA quando não entende
```

---

## 💻 Tecnologias

- **Node.js 20+** - Ambiente moderno e performático
- **Baileys 6.6.0** - Conexão estável com WhatsApp Web
- **OpenAI / Groq** - IAs de última geração
- **ES Modules** - Código limpo e atual
- **Pino Logger** - Logs profissionais estruturados

---

## 📸 Demonstração

### Menu Principal
```
Olá! Como posso te ajudar?
1️⃣ Tenho uma dúvida
2️⃣ Ver catálogo
3️⃣ Falar com atendente
```

### Catálogo de Produtos
```
📦 Nosso Catálogo

1. Produto Premium - R$ 199,90
   ⭐⭐⭐⭐⭐ (127 avaliações)

2. Produto Pro - R$ 299,90
   ⭐⭐⭐⭐⭐ (89 avaliações)

Digite o número para ver detalhes!
```

### IA Conversacional
```
👤 Cliente: "Como funciona a entrega?"

🤖 Bot: "Nossa entrega funciona assim:
📦 Enviamos para todo Brasil
🚚 Prazo: 5-10 dias úteis
💰 Frete grátis acima de R$ 199

Tem mais alguma dúvida?"
```

---

## ⚡ Instalação Rápida

### 1️⃣ **Requisitos**

- Node.js 18 ou superior
- VPS/Servidor com acesso SSH
- WhatsApp (não precisa ser Business)
- API Key OpenAI ou Groq

### 2️⃣ **Instalar Dependências**

```bash
npm install
```

### 3️⃣ **Configurar Variáveis**

```bash
cp .env.example .env
# Edite o .env com suas API Keys
```

### 4️⃣ **Rodar o Bot**

```bash
npm start
```

### 5️⃣ **Escanear QR Code**

O QR Code aparecerá no terminal. Escaneie com WhatsApp!

---

## 📚 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| [README.md](./README.md) | Documentação técnica completa |
| [QUICKSTART.md](./QUICKSTART.md) | Guia de 5 minutos |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Como customizar |
| [CHECKLIST-PRODUCAO.md](./CHECKLIST-PRODUCAO.md) | Deploy em produção |
| [COMERCIAL.md](./COMERCIAL.md) | Informações de venda |

**Total:** +40KB de documentação em português! 📖

---

## 🎁 O que está INCLUSO?

✅ Código-fonte completo (Node.js)
✅ Documentação detalhada em PT-BR
✅ Arquivos de configuração prontos
✅ 3 produtos de exemplo configurados
✅ Módulos plug-and-play
✅ Sistema de logs avançado
✅ Modo de teste sem WhatsApp
✅ Licença MIT (uso comercial permitido)

---

## ⚠️ O que NÃO está incluso

❌ Instalação no servidor (você instala)
❌ Suporte técnico dedicado
❌ API Keys (OpenAI/Groq por sua conta)
❌ Servidor VPS (use o seu)
❌ Customizações extras

> **Nota:** O código é totalmente documentado e fácil de seguir!

---

## 💰 Preço

<div align="center">

### 🎉 OFERTA DE LANÇAMENTO

# ~~R$ 97,00~~ R$ 29,90

**SCRIPT PRONTO - SEM MENSALIDADES**

<sub>Pagamento único • Acesso imediato • Código aberto</sub>

[🛒 **COMPRAR AGORA**](SUA_PAGINA_DE_VENDAS)

</div>

---

## 🛒 Como Comprar?

### **Escolha sua plataforma favorita:**

- 🟠 [**Hotmart**](link-hotmart) - Cartão, PIX, Boleto
- 🟢 [**Kiwify**](link-kiwify) - Aprovação instantânea
- 🔵 [**Mercado Livre**](link-mercadolivre) - Mercado Pago
- 💬 [**WhatsApp Direto**](https://wa.me/seu-numero) - Fale comigo

---

## 📋 Estrutura do Projeto

```
c:\BotWhatsIA\
├── src/
│   ├── core/
│   │   ├── bot.js          # Conexão WhatsApp
│   │   ├── router.js       # Roteamento inteligente
│   │   └── license.js      # Sistema de licenças
│   ├── modules/
│   │   ├── ia/             # Módulo de IA
│   │   ├── catalog/        # Catálogo de produtos
│   │   └── humano/         # Transferência humana
│   ├── services/
│   │   └── ai.js           # Integração OpenAI/Groq
│   └── utils/
│       ├── logger.js       # Sistema de logs
│       └── helpers.js      # Funções auxiliares
├── .env.example            # Exemplo de configuração
├── license.json            # Licenciamento de módulos
└── package.json
```

---

## 🔧 Configuração da IA

### OpenAI (GPT-4)

```env
AI_PROVIDER=openai
AI_MODEL=gpt-4o-mini
OPENAI_API_KEY=sk-seu-token-aqui
```

**Custo:** ~$0.001 por mensagem (~R$ 0,005)

### Groq (Llama 3.1) - GRATUITO

```env
AI_PROVIDER=groq
AI_MODEL=llama-3.1-70b-versatile
GROQ_API_KEY=gsk_seu-token-aqui
```

**Custo:** GRÁTIS (até 14.400 req/dia)

---

## 🛡️ Licença & Uso Comercial

### ✅ **Você PODE:**

- Modificar o código
- Usar comercialmente
- Revender (mantendo créditos)
- Integrar com seus sistemas
- Criar versões derivadas

### ❌ **Você NÃO PODE:**

- Remover créditos originais
- Vender como "de sua autoria"
- Oferecer garantias em meu nome

**Licença MIT completa:** [LICENSE](./LICENSE)

---

## ❓ FAQ - Perguntas Frequentes

<details>
<summary><strong>1. Preciso ter conhecimento técnico?</strong></summary>

Sim, conhecimento básico de:
- Terminal/CMD
- Instalar Node.js
- Usar VPS/Servidor
- Editar arquivos .env

A documentação explica tudo passo a passo!
</details>

<details>
<summary><strong>2. Funciona em hospedagem compartilhada?</strong></summary>

NÃO. Você precisa de:
- VPS ou Servidor Dedicado
- Acesso SSH/Terminal
- Node.js instalado

Recomendamos: DigitalOcean, Contabo, AWS, Hostinger VPS
</details>

<details>
<summary><strong>3. Preciso de WhatsApp Business API oficial?</strong></summary>

NÃO! Usamos Baileys que conecta via WhatsApp Web.

Você só precisa de:
- WhatsApp normal ou Business (app)
- Número de telefone
- Escanear QR Code

Não precisa pagar pela API oficial cara!
</details>

<details>
<summary><strong>4. Quanto custa a API da IA?</strong></summary>

**OpenAI (GPT-4):** ~$0.001 por mensagem (~R$ 0,005)
- 1000 mensagens = R$ 5,00

**Groq (Llama 3.1):** GRATUITO
- Até 14.400 requisições/dia
- Sem custos

Recomendamos começar com Groq!
</details>

<details>
<summary><strong>5. Tem suporte técnico?</strong></summary>

NÃO incluímos suporte direto no preço de R$ 29,90.

Mas você tem:
- ✅ +40KB de documentação detalhada
- ✅ Código comentado linha por linha
- ✅ Exemplos práticos
- ✅ Comunidade no GitHub (issues)

Se precisar de suporte dedicado, consulte preços separadamente.
</details>

<details>
<summary><strong>6. Posso personalizar o bot?</strong></summary>

SIM! Código 100% aberto e modificável:
- Personalidade da IA (prompts)
- Cores e emojis das mensagens
- Menu e opções
- Adicionar novos módulos
- Integrar com APIs externas

Tudo está documentado!
</details>

<details>
<summary><strong>7. Quantos atendimentos simultâneos?</strong></summary>

ILIMITADOS! Depende do seu servidor:
- VPS 1GB RAM: ~100 conversas simultâneas
- VPS 2GB RAM: ~500 conversas simultâneas
- VPS 4GB RAM: ~2000+ conversas simultâneas

O bot é muito leve!
</details>

<details>
<summary><strong>8. Posso revender o script?</strong></summary>

SIM! Licença MIT permite uso comercial.

Você pode:
- Revender como produto
- Incluir em pacotes
- Oferecer como serviço

Apenas mantenha os créditos originais no código!
</details>

<details>
<summary><strong>9. Funciona com grupos do WhatsApp?</strong></summary>

NÃO (e isso é BOM!). O bot tem filtro duplo que:
- Ignora mensagens de grupos
- Responde apenas mensagens diretas (DM)

Isso protege contra spam e uso indevido.
</details>

<details>
<summary><strong>10. Vai ter atualizações?</strong></summary>

SIM! Estamos desenvolvendo novos módulos:
- 📅 Agendamento
- 🍔 Pedidos para Restaurantes
- 📊 Captura de Leads
- 💳 Pagamentos PIX

Clientes que comprarem agora terão DESCONTO nos módulos futuros!
</details>

---

## 🆕 Roadmap - Módulos Futuros

Em desenvolvimento para 2025:

- 📅 **Agendamento** - Clínicas, salões, consultórios
- 🍔 **Pedidos** - Restaurantes e delivery
- 📊 **Leads** - Captura e integração com CRM
- 💳 **Pagamentos** - PIX automático
- 🏠 **Imobiliária** - Catálogo de imóveis
- 🎓 **Infoprodutos** - Cursos e mentorias
- 💪 **Academias** - Planos e reservas
- 🏥 **Clínicas** - Triagem e agendamento

**📢 Quem comprar agora garante descontos nos módulos futuros!**

---

## 🌟 Comparação com Concorrentes

| Recurso | **Nosso Bot** | Outros |
|---------|--------------|--------|
| **Preço** | R$ 29,90 (único) | R$ 97+ ou mensal |
| **Código Aberto** | ✅ Sim | ❌ Não |
| **IA Inclusa** | ✅ 2 opções | ⚠️ Às vezes |
| **Catálogo** | ✅ Sim | ⚠️ Raramente |
| **Docs PT-BR** | ✅ +40KB | ❌ Pouca |
| **Modo Teste** | ✅ Sim | ❌ Não |
| **Uso Comercial** | ✅ MIT | ❌ Restrito |
| **Mensalidade** | ❌ Não | ✅ Sempre |

---

## 📞 Contato & Suporte

- 💬 **WhatsApp:** [(XX) XXXXX-XXXX](https://wa.me/seu-numero)
- 📧 **Email:** contato@seuemail.com
- 🐙 **GitHub:** [Issues](../../issues)
- 💼 **LinkedIn:** [Seu Perfil](https://linkedin.com/in/seu-perfil)

---

## 🌐 Onde Nos Encontrar

- 🎨 **Fiverr:** [Ver serviços](https://fiverr.com/seu-usuario)
- 🛒 **Mercado Livre:** [Ver anúncio](https://mercadolivre.com)
- 📘 **Facebook:** Grupos de programadores
- 🔵 **Reddit:** r/node, r/webdev
- 🟠 **Hotmart:** [Ver produto](link-hotmart)

---

## 📜 Licença

Este projeto está sob a licença **MIT**. Veja [LICENSE](./LICENSE) para mais detalhes.

Você pode usar comercialmente, modificar e distribuir livremente!

---

<div align="center">

## 🎯 Comece Agora por Apenas R$ 29,90

### [🛒 COMPRAR SCRIPT](SUA_PAGINA_DE_VENDAS)

<sub>Acesso imediato • Código aberto • Sem mensalidades</sub>

---

**Criado com ❤️ para automatizar atendimentos no WhatsApp**

⭐ Se este projeto te ajudou, deixe uma estrela!

**[⭐ Star no GitHub](../../stargazers)** • **[🍴 Fork](../../fork)** • **[📢 Compartilhar](../../)**

</div>
