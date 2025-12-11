import logger from '../../utils/logger.js';
import { getAllProducts, getProductById, formatCurrency } from './catalogService.js';

function assertSendFunction() {
  if (typeof global.sendWhatsApp !== 'function') {
    throw new Error('Função global sendWhatsApp não configurada.');
  }
}

function buildMenuMessage(products) {
  const header = '📦 *Catálogo de Produtos*\n';
  const productList = products
    .map((product) => {
      const price = formatCurrency(product.preco);
      return `${product.id}. *${product.nome}* - ${price}`;
    })
    .join('\n');
  const footer = '\n\nDigite o número do produto para ver detalhes.';

  return `${header}\n${productList}${footer}`;
}

export async function sendCatalogMenu(chatId) {
  assertSendFunction();
  const products = await getAllProducts();

  if (products.length === 0) {
    await global.sendWhatsApp(
      chatId,
      'Não há produtos cadastrados no momento. Por favor, tente novamente mais tarde.'
    );
    logger.warn({ chatId }, 'Catálogo vazio solicitado.');
    return;
  }

  const message = buildMenuMessage(products);
  await global.sendWhatsApp(chatId, message);
  logger.info({ chatId }, 'Menu do catálogo enviado.');
}

export async function sendProductById(chatId, id) {
  assertSendFunction();
  const product = await getProductById(id);

  if (!product) {
    await global.sendWhatsApp(
      chatId,
      'Não encontrei esse produto. Digite "2" para ver o catálogo completo ou "0" para voltar ao menu.'
    );
    logger.warn({ chatId, id }, 'Produto não encontrado.');
    return;
  }

  const price = formatCurrency(product.preco);
  const description = `*${product.nome}*\n\n${product.descricao}\n\n💰 ${price}\n\nDigite 2 para voltar ao catálogo ou 0 para voltar ao menu.`;

  if (product.img) {
    await global.sendWhatsApp(chatId, description, { image: { url: product.img } });
  } else {
    await global.sendWhatsApp(chatId, description);
  }

  logger.info({ chatId, productId: id }, 'Detalhes do produto enviados.');
}
