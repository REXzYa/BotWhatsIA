import dotenv from 'dotenv';
import logger from './utils/logger.js';
import { startBot } from './core/bot.js';

dotenv.config();

startBot().catch((error) => {
  logger.error({ err: error }, '❌ Erro fatal ao iniciar o bot.');
  process.exit(1);
});
