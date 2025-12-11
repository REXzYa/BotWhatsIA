import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Seleciona o provedor de IA com base nas variáveis de ambiente.
const PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase();
const MODEL =
  process.env.AI_MODEL || (PROVIDER === 'groq' ? 'llama-3.1-70b-versatile' : 'gpt-4o-mini');
const API_KEY =
  PROVIDER === 'groq'
    ? process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY
    : process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;

/**
 * Envia uma pergunta para o serviço de IA configurado e retorna a resposta em texto.
 * @param {string} text - Mensagem do usuário.
 * @returns {Promise<string>} - Resposta gerada pela IA ou uma mensagem de fallback.
 */
export async function askAI(text) {
  if (!text || !text.trim()) {
    return 'Não entendi sua mensagem. Pode tentar novamente?';
  }

  if (!API_KEY) {
  console.error('⚠️  Chave de API não configurada. Verifique OPENAI_API_KEY ou GROQ_API_KEY.');
    return 'Parece que a IA não está configurada corretamente. Fale com o suporte.';
  }

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

  const endpoints = {
    openai: 'https://api.openai.com/v1/chat/completions',
    groq: 'https://api.groq.com/openai/v1/chat/completions'
  };

  const url = endpoints[PROVIDER] || endpoints.openai;

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
      console.warn('⚠️  Nenhuma resposta recebida da IA. Payload bruto:', data);
      return 'Não consegui entender dessa vez. Pode repetir sua pergunta?';
    }

    return aiMessage.trim();
  } catch (error) {
    console.error('❌ Erro ao consultar a IA:', error?.response?.data || error.message);
    return 'A IA está indisponível no momento. Tente novamente mais tarde.';
  }
}
