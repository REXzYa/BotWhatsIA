import { normalizeText, isNumericOption } from '../utils/helpers.js';
import logger from '../utils/logger.js';

const MODULE_NAME = 'catalogo';
const SUPPORTED_KEYWORDS = ['catalogo', 'catálogo', 'menu', 'produtos'];

// Catálogo interno com dados fictícios para demonstração.
const catalog = {
  1: {
    title: 'Hambúrguer Artesanal',
    description: 'Pão brioche, 160g de carne Angus, queijo cheddar e molho especial da casa.',
    price: 'R$ 29,90',
    image: 'https://via.placeholder.com/600x600.png?text=Hamburguer'
  },
  2: {
    title: 'Pizza Margherita',
    description: 'Massa fina, molho de tomate pelati, mozzarella de búfala e folhas frescas de manjericão.',
    price: 'R$ 42,00',
    image: 'https://via.placeholder.com/600x600.png?text=Pizza'
  },
  3: {
    title: 'Suco Natural',
    description: 'Escolha entre laranja, limão ou maracujá. Servido gelado sem conservantes.',
    price: 'R$ 9,90',
    image: 'https://via.placeholder.com/600x600.png?text=Bebidas'
  },
  4: {
    title: 'Cheesecake de Frutas Vermelhas',
    description: 'Base crocante, creme leve e cobertura artesanal de frutas vermelhas.',
    price: 'R$ 17,50',
    image: 'https://via.placeholder.com/600x600.png?text=Sobremesa'
  }
};

let cachedSock = null;

function buildMenuMessage() {
  return [
    '📦 *Catálogo de Produtos*',
    '',
    '1️⃣ Burgers',
    '2️⃣ Pizzas',
    '3️⃣ Bebidas',
    '4️⃣ Sobremesas',
    '',
    'Envie o número para saber mais.'
  ].join('\n');
}

function isKeywordMatch(text) {
  const normalized = normalizeText(text);
  return SUPPORTED_KEYWORDS.some((keyword) => normalizeText(keyword) === normalized);
}

async function sendCatalogItem(sock, from, itemKey) {
  const item = catalog[itemKey];

  if (!item) {
    await sock.sendMessage(from, {
      text: 'Não encontrei essa opção. Envie 1️⃣, 2️⃣, 3️⃣ ou 4️⃣ para receber os detalhes.'
    });
    return;
  }

  await sock.sendMessage(from, {
    image: { url: item.image },
    caption: `*${item.title}*\n${item.description}\n\n💰 ${item.price}`
  });
}

const catalogModule = {
  name: MODULE_NAME,
  keywords: SUPPORTED_KEYWORDS,
  /**
   * Armazena a instância do socket Baileys para uso dentro do módulo.
   * @param {import('@whiskeysockets/baileys').WASocket} sock
   */
  init(sock) {
    cachedSock = sock;
  },
  /**
   * Processa mensagens e responde com o catálogo quando necessário.
   * @param {{ sock?: import('@whiskeysockets/baileys').WASocket, from: string, message: string }} params
   * @returns {Promise<boolean>} true quando a mensagem for tratada
   */
  async handle({ sock = cachedSock, from, message }) {
    const socket = sock || cachedSock;

    if (!socket) {
      throw new Error('Socket Baileys não inicializado. Chame init(sock) antes de handle.');
    }

    const text = (message || '').trim();
    if (!text) {
      return false;
    }

    if (isKeywordMatch(text)) {
      await socket.sendMessage(from, { text: buildMenuMessage() });
      logger.debug({ module: MODULE_NAME, from }, 'Menu do catálogo enviado.');
      return true;
    }

    const numericOption = isNumericOption(text);
    if (numericOption && catalog[numericOption]) {
      await sendCatalogItem(socket, from, numericOption);
      logger.debug({ module: MODULE_NAME, from, option: numericOption }, 'Item do catálogo enviado.');
      return true;
    }

    return false;
  }
};

export default catalogModule;

/*
Como instalar este módulo:
1. Copie `catalogo.js` para `src/modules/catalogo.js` dentro do seu projeto.

Como ativar no `bot.js`:
1. Importe o módulo: `import catalogModule from '../modules/catalogo.js';`
2. Registre no roteador: `registerModule(catalogModule);`
3. O roteador chamará `init` automaticamente após criar o socket e `handle` para cada mensagem.
*/
