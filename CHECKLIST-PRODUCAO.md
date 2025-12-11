# ✅ Checklist de Produção - Bot WhatsApp IA

Use este checklist antes de colocar o bot em produção.

---

## 🔐 Segurança

- [ ] **Arquivo `.env` configurado** e **NÃO versionado** no Git
- [ ] Arquivo `.gitignore` contém:
  ```
  .env
  auth/
  node_modules/
  ```
- [ ] Chaves de API válidas e com créditos suficientes
- [ ] Pasta `auth/` com permissões restritas (não compartilhar)
- [ ] Logs não expõem informações sensíveis

---

## ⚙️ Configuração

- [ ] Variáveis `.env` preenchidas corretamente:
  - `AI_PROVIDER` (openai ou groq)
  - `GROQ_API_KEY` ou `OPENAI_API_KEY`
  - `AI_MODEL` compatível com o provider
- [ ] Produtos atualizados em `products.json`
- [ ] Personalidade da IA configurada em `iaPrompt.js`
- [ ] Menu principal personalizado em `router.js`
- [ ] Mensagens de boas-vindas e despedida configuradas

---

## 🧪 Testes

- [ ] Teste local executado com sucesso (`node test-local.js`)
- [ ] Teste completo no WhatsApp real:
  - [ ] Saudação inicial funciona (`oi`)
  - [ ] Menu exibido corretamente
  - [ ] Módulo IA responde perguntas
  - [ ] Catálogo exibe todos os produtos
  - [ ] Detalhes de produto com imagem funcionam
  - [ ] Transferência para humano funciona
  - [ ] Comandos globais funcionam (`menu`, `atendente`)
  - [ ] Bot ignora grupos corretamente
  - [ ] Bot não responde mensagens próprias

---

## 🚀 Infraestrutura

### **Servidor**

- [ ] VPS ou cloud escolhido (DigitalOcean, AWS, Azure, etc.)
- [ ] Sistema operacional: Linux (Ubuntu 22.04 LTS recomendado)
- [ ] Node.js 18+ instalado no servidor
- [ ] Firewall configurado (portas necessárias abertas)

### **Processo**

- [ ] PM2 instalado globalmente: `npm install -g pm2`
- [ ] Bot iniciado com PM2: `pm2 start index.js --name whatsapp-bot`
- [ ] PM2 configurado para reiniciar automaticamente:
  ```bash
  pm2 startup
  pm2 save
  ```
- [ ] Logs monitorados: `pm2 logs whatsapp-bot`

### **Backup**

- [ ] Backup automático da pasta `auth/` configurado
- [ ] Script de backup do `products.json`
- [ ] Cron job para backups diários:
  ```bash
  0 3 * * * tar -czf /backup/bot-$(date +\%Y\%m\%d).tar.gz /caminho/BotWhatsIA/auth/
  ```

---

## 📊 Monitoramento

- [ ] Sistema de logs configurado (`src/utils/logger.js`)
- [ ] Alertas de erro configurados (email, Slack, Discord)
- [ ] Monitoramento de uptime (UptimeRobot, Pingdom)
- [ ] Dashboard de métricas (opcional: Grafana, DataDog)

---

## 📱 WhatsApp

- [ ] Número de teste/produção dedicado (não pessoal)
- [ ] Conta WhatsApp Business (opcional, mas recomendado)
- [ ] Perfil do bot configurado:
  - [ ] Foto de perfil
  - [ ] Nome da empresa
  - [ ] Descrição/bio
- [ ] Outras sessões do WhatsApp Web desconectadas

---

## 🔄 Atualização

- [ ] Repositório Git configurado
- [ ] Branch `main` protegida
- [ ] Processo de deploy documentado:
  ```bash
  git pull origin main
  npm install
  pm2 restart whatsapp-bot
  ```

---

## 📈 Performance

- [ ] Modelo de IA adequado para volume esperado:
  - Baixo volume (<100 msg/dia): Qualquer modelo
  - Médio volume (100-1000 msg/dia): GPT-4o-mini ou Llama-8B
  - Alto volume (>1000 msg/dia): Llama-8B-instant (Groq)
- [ ] Timeout da API ajustado se necessário
- [ ] Rate limiting implementado (se alto volume)

---

## 💰 Custos

- [ ] Estimativa de custos calculada:
  - Servidor VPS: R$ 20-50/mês
  - API Groq: R$ 0/mês (gratuito até limite)
  - API OpenAI: Variável (calcular por token)
- [ ] Limites de uso configurados nas APIs
- [ ] Alertas de gastos ativados

---

## 📖 Documentação

- [ ] README.md atualizado com instruções específicas do projeto
- [ ] Credenciais e acessos documentados (em local seguro)
- [ ] Contatos de suporte técnico definidos
- [ ] Procedimentos de emergência documentados:
  - Como reiniciar o bot
  - Como restaurar backup
  - Como trocar credenciais

---

## 👥 Equipe

- [ ] Atendentes humanos treinados
- [ ] Sistema de notificação para transferências configurado
- [ ] Horário de atendimento humano definido
- [ ] Mensagens fora do horário configuradas

---

## 🎯 Pós-Deploy

### **Primeira Semana**

- [ ] Monitorar logs diariamente
- [ ] Coletar feedback dos primeiros usuários
- [ ] Ajustar prompts da IA se necessário
- [ ] Verificar taxa de transferência para humanos

### **Primeiro Mês**

- [ ] Analisar métricas:
  - [ ] Total de conversas
  - [ ] Taxa de resolução da IA
  - [ ] Produtos mais consultados
  - [ ] Horários de pico
- [ ] Otimizar respostas baseado em dados
- [ ] Adicionar produtos/serviços mais procurados

---

## 🆘 Plano de Contingência

**Se o bot parar de funcionar:**

1. [ ] Verificar se o processo PM2 está rodando: `pm2 status`
2. [ ] Ver logs de erro: `pm2 logs whatsapp-bot --lines 50`
3. [ ] Verificar conexão do servidor: `ping google.com`
4. [ ] Testar chave API manualmente
5. [ ] Restaurar backup se necessário
6. [ ] Reiniciar bot: `pm2 restart whatsapp-bot`
7. [ ] Se persistir, reconectar QR Code (deletar `auth/` e `npm start`)

**Contatos de Emergência:**
- Responsável Técnico: _________________
- Telefone: _________________
- Email: _________________

---

## ✅ Aprovação Final

- [ ] **Todos os itens acima verificados**
- [ ] **Testes em produção realizados**
- [ ] **Equipe treinada e pronta**
- [ ] **Documentação completa**

**Data do Deploy:** ___/___/______

**Responsável:** _________________

**Assinatura:** _________________

---

<div align="center">

🎉 **Bot pronto para produção!**

Lembre-se: Monitore constantemente nas primeiras semanas.

</div>
