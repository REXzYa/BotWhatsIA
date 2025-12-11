import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

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

/**
 * Envia uma pergunta para o provedor de IA configurado e retorna a resposta em texto.
 * @param {string} text - Mensagem do usuário.
 * @returns {Promise<string>} - Texto de resposta ou fallback amistoso.
 */
export async function askAI(text) {
  if (!text || !text.trim()) {
    return 'Não entendi sua mensagem. Pode tentar novamente?';
  }

  if (!API_KEY) {
    logger.error('⚠️  Chave de API não configurada. Verifique OPENAI_API_KEY ou GROQ_API_KEY.');
    return 'Parece que a IA não está configurada corretamente. Fale com o suporte.';
  }

  const url = endpoints[PROVIDER] || endpoints.openai;
  const payload = {
    model: MODEL,
    messages: [
      {
        role: 'system',
        content: 'Você é um assistente do WhatsApp que responde de maneira amigável e direta.'
      },
      {
        role: 'user',
        content: text
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
      return 'Não consegui entender dessa vez. Pode repetir sua pergunta?';
    }

    return aiMessage.trim();
  } catch (error) {
    logger.error(error?.response?.data || error, '❌ Erro ao consultar a IA');
    return 'A IA está indisponível no momento. Tente novamente mais tarde.';
  }
}
