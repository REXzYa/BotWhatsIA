/**
 * Modo de Teste Local - Simula conversas sem WhatsApp
 * Use: node test-local.js
 */

import 'dotenv/config';
import readline from 'readline';
import { handleIncomingMessage, initRouter } from './src/core/router.js';
import logger from './src/utils/logger.js';

// Mock do socket para testes locais
const mockSocket = {
  sendMessage: async (chatId, payload) => {
    console.log('\n🤖 BOT RESPONDEU:');
    console.log('━'.repeat(50));
    if (payload.text) {
      console.log(payload.text);
    }
    if (payload.caption) {
      console.log(payload.caption);
      if (payload.image) {
        console.log(`📷 [Imagem: ${payload.image.url || 'anexada'}]`);
      }
    }
    console.log('━'.repeat(50));
  }
};

// Configura o ambiente de teste
global.sendWhatsApp = async (chatId, texto, opcoes = {}) => {
  await mockSocket.sendMessage(chatId, opcoes.image 
    ? { image: opcoes.image, caption: texto }
    : { text: texto }
  );
};

// Inicializa o router com mock
initRouter(mockSocket);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║          🧪 MODO DE TESTE LOCAL - BOT WHATSAPP           ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('\n📝 Digite suas mensagens como se estivesse no WhatsApp');
console.log('💡 Teste todos os fluxos: oi, 1, 2, produto 1, etc.');
console.log('⚠️  Este modo NÃO conecta ao WhatsApp real');
console.log('🚪 Digite "sair" para encerrar\n');

const askQuestion = () => {
  rl.question('👤 VOCÊ: ', async (message) => {
    if (!message || message.trim().toLowerCase() === 'sair') {
      console.log('\n👋 Encerrando teste local...');
      rl.close();
      process.exit(0);
    }

    try {
      // Simula processamento da mensagem
      await handleIncomingMessage({
        from: '5511999999999@s.whatsapp.net',
        message: message.trim()
      });
    } catch (error) {
      logger.error({ err: error }, 'Erro no teste local');
      console.error('❌ Erro:', error.message);
    }

    // Próxima pergunta
    console.log('');
    askQuestion();
  });
};

// Inicia o loop de perguntas
askQuestion();
