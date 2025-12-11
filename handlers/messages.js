import { askAI } from '../services/ai.js';

// Respostas simples para comandos mais comuns.
const KEYWORD_RESPONSES = {
  oi: 'Oi! Como posso te ajudar hoje? 😊',
  'olá': 'Olá! Precisa de alguma informação?',
  menu:
    'Aqui está o que posso fazer:\n- Responder dúvidas rápidas\n- Encaminhar perguntas para a IA\n- Conectar você com o suporte humano',
  ajuda:
    'Estou aqui para ajudar! Você pode perguntar sobre produtos, horários, dúvidas gerais ou pedir para falar com um humano.'
};

/**
 * Trata mensagens recebidas e decide se responde direto ou envia para a IA.
 * @param {string} messageText - Texto da mensagem recebida.
 * @param {import('@whiskeysockets/baileys').WASocket} sock - Conexão ativa com o WhatsApp.
 * @param {string} from - ID do remetente/contato.
 */
export async function handleMessage(messageText, sock, from) {
  const text = (messageText || '').trim();

  if (!text) {
    console.log('Mensagem vazia ignorada.');
    return;
  }

  const normalized = text.toLowerCase();

  try {
    if (KEYWORD_RESPONSES[normalized]) {
      await sock.sendMessage(from, { text: KEYWORD_RESPONSES[normalized] });
      console.log(`[Bot] Resposta rápida enviada para ${from}: ${normalized}`);
      return;
    }

    // Caso não seja uma palavra-chave, consultamos a IA e retornamos a resposta.
    const aiReply = await askAI(text);
    await sock.sendMessage(from, { text: aiReply });
    console.log(`[Bot] Resposta da IA enviada para ${from}`);
  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error.message);
    await sock.sendMessage(from, {
      text: 'Tive um problema ao processar sua mensagem. Vamos tentar novamente mais tarde, ok?'
    });
  }
}
