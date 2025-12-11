import { askAI } from '../services/ai.js';
import logger from '../utils/logger.js';
import { normalizeText } from '../utils/helpers.js';

const modules = [];

const QUICK_RESPONSES = new Map([
  ['oi', 'Oi! Como posso te ajudar hoje? 😊'],
  ['ola', 'Olá! Precisa de alguma informação?'],
  [
    'menu',
    'Aqui está o que posso fazer:\n- Responder dúvidas rápidas\n- Encaminhar perguntas para a IA\n- Conectar você com o suporte humano'
  ],
  [
    'ajuda',
    'Estou aqui para ajudar! Você pode perguntar sobre produtos, horários, dúvidas gerais ou pedir para falar com um humano.'
  ]
]);

export function registerModule(module) {
  if (!module?.name || typeof module.handle !== 'function') {
    throw new Error('Módulo inválido. Certifique-se de exportar name, keywords, init e handle.');
  }

  const exists = modules.find((item) => item.name === module.name);
  if (exists) {
    logger.warn({ module: module.name }, 'Módulo já registrado, ignorando duplicata.');
    return;
  }

  modules.push(module);
  logger.info({ module: module.name }, 'Módulo registrado com sucesso.');
}

export function initModules(sock) {
  modules.forEach((module) => {
    try {
      module.init?.(sock);
    } catch (error) {
      logger.error({ err: error, module: module.name }, 'Erro ao inicializar módulo.');
    }
  });
}

export async function handleIncomingMessage({ sock, from, message }) {
  const text = (message || '').trim();
  if (!text) {
    logger.debug({ from }, 'Mensagem vazia ignorada.');
    return;
  }

  const normalized = normalizeText(text);

  if (QUICK_RESPONSES.has(normalized)) {
    const reply = QUICK_RESPONSES.get(normalized);
    await sock.sendMessage(from, { text: reply });
    logger.info({ from, keyword: normalized }, 'Resposta rápida enviada.');
    return;
  }

  for (const module of modules) {
    try {
      const handled = await module.handle({ sock, from, message: text });
      if (handled) {
        logger.info({ from, module: module.name }, 'Mensagem tratada por módulo.');
        return;
      }
    } catch (error) {
      logger.error({ err: error, module: module.name }, 'Erro ao processar mensagem em módulo.');
    }
  }

  const aiReply = await askAI(text);
  await sock.sendMessage(from, { text: aiReply });
  logger.info({ from }, 'Resposta enviada pela IA.');
}
