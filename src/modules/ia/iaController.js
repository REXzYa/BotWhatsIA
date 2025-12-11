import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../../utils/logger.js';
import { SYSTEM_PROMPT, ERROR_FALLBACK_MESSAGE, UNAVAILABLE_MESSAGE } from './iaPrompt.js';

dotenv.config();

const PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase();
const MODEL =
  process.env.AI_MODEL || (PROVIDER === 'groq' ? 'llama-3.1-70b-versatile' : 'gpt-4o-mini');
const API_KEY =
  PROVIDER === 'groq'
    ? process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY
    : process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;

const endpoints = {
  openai: 'https://api.openai.com/v1/chat/completions',
  groq: 'https://api.groq.com/openai/v1/chat/completions'
};

function assertSendFunction() {
  if (typeof global.sendWhatsApp !== 'function') {
    throw new Error('Função global sendWhatsApp não configurada.');
  }
}

async function callAI(userMessage) {
  if (!API_KEY) {
    logger.error('⚠️  Chave de API não configurada. Verifique OPENAI_API_KEY ou GROQ_API_KEY.');
    return null;
  }

  const url = endpoints[PROVIDER] || endpoints.openai;
  const payload = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: userMessage
      }
    ]
  };

  try {
    const { data } = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      timeout: 15000
    });

    const aiMessage = data?.choices?.[0]?.message?.content;
    if (!aiMessage) {
      logger.warn({ payload: data }, '⚠️  Nenhuma resposta recebida da IA.');
      return null;
    }

    return aiMessage.trim();
  } catch (error) {
    logger.error(
      { err: error?.response?.data || error.message },
      '❌ Erro ao consultar a IA'
    );
    return null;
  }
}

/**
 * Processa uma mensagem do usuário e envia a resposta da IA via WhatsApp.
 * @param {string} message - Mensagem do usuário.
 * @param {string} chatId - ID do chat para resposta.
 */
export async function handleIA(message, chatId) {
  assertSendFunction();

  const text = (message || '').trim();
  if (!text) {
    await global.sendWhatsApp(chatId, 'Não entendi sua mensagem. Pode tentar novamente?');
    return;
  }

  logger.info({ chatId, message: text }, 'Mensagem enviada para IA.');

  const aiReply = await callAI(text);

  if (!aiReply) {
    await global.sendWhatsApp(chatId, UNAVAILABLE_MESSAGE);
    logger.warn({ chatId }, 'IA indisponível ou sem resposta.');
    return;
  }

  try {
    await global.sendWhatsApp(chatId, aiReply);
    logger.info({ chatId }, 'Resposta da IA enviada com sucesso.');
  } catch (error) {
    logger.error({ err: error, chatId }, 'Erro ao enviar resposta da IA.');
    await global.sendWhatsApp(chatId, ERROR_FALLBACK_MESSAGE);
  }
}
