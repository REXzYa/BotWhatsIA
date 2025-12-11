# Script para criar repositório privado do Módulo IA
# USO: .\criar-repo-ia-privado.ps1

Write-Host "Criando repositório privado do Módulo IA..." -ForegroundColor Cyan
Write-Host ""

# Define pastas
$pastaOrigem = Get-Location
$pastaDestino = Join-Path $pastaOrigem.Path "..\BotWhatsIA-IA-Premium"

# Cria pasta de destino
Write-Host "Criando pasta: $pastaDestino" -ForegroundColor Yellow
if (Test-Path $pastaDestino) {
    Write-Host "Pasta já existe. Removendo..." -ForegroundColor Yellow
    Remove-Item -Path $pastaDestino -Recurse -Force
}
New-Item -Path $pastaDestino -ItemType Directory | Out-Null

# Criar estrutura de pastas
$estrutura = @(
    "src\modules\ia",
    "services",
    "handlers"
)

foreach ($pasta in $estrutura) {
    $caminho = Join-Path $pastaDestino $pasta
    New-Item -Path $caminho -ItemType Directory -Force | Out-Null
}

# Copiar módulo IA
Write-Host "Copiando arquivos do Módulo IA..." -ForegroundColor Green

# Verificar e copiar src/modules/ia
$iaPath = Join-Path $pastaOrigem.Path "src\modules\ia"
if (Test-Path $iaPath) {
    Copy-Item -Path "$iaPath\*" -Destination (Join-Path $pastaDestino "src\modules\ia") -Recurse -Force
    Write-Host "  OK: src/modules/ia" -ForegroundColor Gray
} else {
    Write-Host "  AVISO: src/modules/ia não encontrado (módulo ainda não criado)" -ForegroundColor Yellow
}

# Verificar e copiar services
$servicesPath = Join-Path $pastaOrigem.Path "services"
if (Test-Path $servicesPath) {
    $openaiFile = Join-Path $servicesPath "openai.js"
    $ollamaFile = Join-Path $servicesPath "ollama.js"
    
    if (Test-Path $openaiFile) {
        Copy-Item -Path $openaiFile -Destination (Join-Path $pastaDestino "services") -Force
        Write-Host "  OK: services/openai.js" -ForegroundColor Gray
    }
    
    if (Test-Path $ollamaFile) {
        Copy-Item -Path $ollamaFile -Destination (Join-Path $pastaDestino "services") -Force
        Write-Host "  OK: services/ollama.js" -ForegroundColor Gray
    }
}

# Verificar e copiar handlers
$handlersPath = Join-Path $pastaOrigem.Path "handlers"
if (Test-Path $handlersPath) {
    $iaHandlerFile = Join-Path $handlersPath "iaHandler.js"
    if (Test-Path $iaHandlerFile) {
        Copy-Item -Path $iaHandlerFile -Destination (Join-Path $pastaDestino "handlers") -Force
        Write-Host "  OK: handlers/iaHandler.js" -ForegroundColor Gray
    }
}

# Copiar documentação
$instalacaoFile = Join-Path $pastaOrigem.Path "INSTALACAO-MODULO-IA.md"
if (Test-Path $instalacaoFile) {
    Copy-Item -Path $instalacaoFile -Destination $pastaDestino -Force
    Write-Host "  OK: INSTALACAO-MODULO-IA.md" -ForegroundColor Gray
}

# Criar README.md
$readmeContent = @"
# Módulo IA Premium - WhatsApp Bot

## O que é?

Este é o **Módulo IA Premium** para o WhatsApp Bot.  
Adiciona inteligência artificial com GPT-4 (OpenAI) ou Llama 3.1 (Ollama).

## IMPORTANTE

Este módulo **requer o bot base** instalado:
https://github.com/milenemolina/BotWhatsIA

## Conteúdo

``````
BotWhatsIA-IA-Premium/
├── src/
│   └── modules/
│       └── ia/                 <- Controlador do módulo IA
│           ├── iaController.js
│           ├── prompts.js
│           └── index.js
├── services/
│   ├── openai.js              <- Integração OpenAI
│   └── ollama.js              <- Integração Ollama
├── handlers/
│   └── iaHandler.js           <- Handler de mensagens IA
└── INSTALACAO-MODULO-IA.md    <- LEIA PRIMEIRO!
``````

## Instalação

Veja instruções completas em: **INSTALACAO-MODULO-IA.md**

### Resumo rápido:

1. Clone este repositório (você já tem acesso)
2. Copie as pastas para seu bot base
3. Instale dependências: ``npm install openai ollama``
4. Configure .env com suas API keys
5. Ative módulo no license.json
6. Teste!

## Suporte

Você tem 30 dias de suporte incluído!

- Email: contato@seudominio.com
- WhatsApp: https://wa.me/5511999999999
- Horário: Segunda a sexta, 9h às 18h

## Licença

**Uso Proprietário - Comprador Individual**

PERMITIDO:
- Uso comercial pelo comprador
- Modificação para uso próprio
- Uso em múltiplos projetos seus

PROIBIDO:
- Redistribuição ou revenda
- Compartilhamento público do código
- Inclusão em produtos derivados para venda

## Obrigado pela compra!

Se tiver dúvidas, consulte INSTALACAO-MODULO-IA.md ou entre em contato no suporte.
"@

Set-Content -Path (Join-Path $pastaDestino "README.md") -Value $readmeContent -Encoding UTF8
Write-Host "  OK: README.md criado" -ForegroundColor Gray

# Criar package.json
$packageContent = @"
{
  "name": "botwhats-ia-module",
  "version": "1.0.0",
  "description": "Módulo IA Premium para WhatsApp Bot",
  "type": "module",
  "author": "Milene Molina",
  "license": "PROPRIETARY",
  "dependencies": {
    "openai": "^4.20.0",
    "ollama": "^0.5.0"
  },
  "peerDependencies": {
    "pino": "^8.16.0"
  }
}
"@

Set-Content -Path (Join-Path $pastaDestino "package.json") -Value $packageContent -Encoding UTF8
Write-Host "  OK: package.json criado" -ForegroundColor Gray

# Criar LICENSE
$licenseContent = @"
LICENÇA DE USO - MÓDULO IA PREMIUM

Copyright (c) 2025 Milene Molina

PERMISSÕES CONCEDIDAS AO COMPRADOR:
===================================
- Uso comercial em projetos próprios
- Modificação para uso pessoal
- Uso em múltiplos projetos do comprador
- Uso privado

RESTRIÇÕES:
===========
- Redistribuição do código
- Revenda do módulo
- Compartilhamento público (GitHub público, etc)
- Inclusão em produtos derivados para revenda
- Sublicenciamento

GARANTIA:
=========
Este software é fornecido "como está", sem garantias de qualquer tipo,
expressas ou implícitas, incluindo, mas não se limitando a garantias
de comercialização, adequação a um propósito específico e não violação.

SUPORTE:
========
- 30 dias de suporte técnico incluído após a compra
- Suporte via email e WhatsApp
- Atualizações gratuitas por tempo indeterminado

VIOLAÇÃO:
=========
O uso deste software em violação aos termos desta licença resultará
na revogação imediata do direito de uso sem reembolso.

Para dúvidas sobre a licença, entre em contato:
Email: contato@seudominio.com
WhatsApp: https://wa.me/5511999999999
"@

Set-Content -Path (Join-Path $pastaDestino "LICENSE") -Value $licenseContent -Encoding UTF8
Write-Host "  OK: LICENSE criada" -ForegroundColor Gray

# Criar .gitignore
$gitignoreContent = @"
node_modules/
.env
*.log
.DS_Store
Thumbs.db
"@

Set-Content -Path (Join-Path $pastaDestino ".gitignore") -Value $gitignoreContent -Encoding UTF8
Write-Host "  OK: .gitignore criado" -ForegroundColor Gray

# Inicializar git
Write-Host ""
Write-Host "Inicializando Git..." -ForegroundColor Yellow
Set-Location $pastaDestino
git init | Out-Null
git add . | Out-Null
git commit -m "Initial commit - Módulo IA Premium v1.0.0" | Out-Null

Write-Host ""
Write-Host "Repositório do Módulo IA criado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Localização: $pastaDestino" -ForegroundColor Cyan
Write-Host ""
Write-Host "PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Criar repositório PRIVADO no GitHub:"
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   - Nome: BotWhatsIA-IA-Premium"
Write-Host "   - Tipo: PRIVADO"
Write-Host "   - Criar repositório"
Write-Host ""
Write-Host "2. Conectar e fazer push:"
Write-Host "   cd $pastaDestino" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/milenemolina/BotWhatsIA-IA-Premium.git" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "3. Quando vender o módulo:"
Write-Host "   - Settings -> Collaborators -> Add people"
Write-Host "   - Digite email do comprador"
Write-Host "   - Cliente recebe convite para clonar repo privado"
Write-Host ""

# Voltar para pasta original
Set-Location $pastaOrigem
