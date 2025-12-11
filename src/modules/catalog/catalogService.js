import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, 'products.json');

let cachedCatalog = null;

async function loadCatalog() {
  if (cachedCatalog) {
    return cachedCatalog;
  }

  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    cachedCatalog = parsed?.produtos || [];
    return cachedCatalog;
  } catch (error) {
    logger.error({ err: error }, '❌ Não foi possível carregar o catálogo de produtos.');
    cachedCatalog = [];
    return cachedCatalog;
  }
}

/**
 * Retorna todos os produtos do catálogo.
 * @returns {Promise<Array>} Lista de produtos.
 */
export async function getAllProducts() {
  return loadCatalog();
}

/**
 * Retorna um produto específico pelo ID.
 * @param {number} id - ID do produto.
 * @returns {Promise<Object|null>} Produto encontrado ou null.
 */
export async function getProductById(id) {
  const catalog = await loadCatalog();
  return catalog.find((product) => Number(product.id) === Number(id)) || null;
}

/**
 * Formata valores numéricos para o padrão de moeda brasileira.
 * @param {number} value - Valor a ser formatado.
 * @returns {string} Valor formatado em R$.
 */
export function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
