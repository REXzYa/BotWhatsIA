import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import qrcode from 'qrcode-terminal';
import logger from '../utils/logger.js';
import { initRouter, handleIncomingMessage } from './router.js';
import { loadLicense, validateLicense, displayLicenseInfo } from './license.js';

const authFolder = path.join(process.cwd(), 'auth');

async function ensureAuthFolder() {
  await fs.promises.mkdir(authFolder, { recursive: true });
}

function extractMessageText(message) {
  return (
    message?.message?.conversation ||
    message?.message?.extendedTextMessage?.text ||
    message?.message?.imageMessage?.caption ||
    message?.message?.videoMessage?.caption ||
    ''
  );
}

export async function startBot() {
  logger.info('🚀 Iniciando bot de WhatsApp com IA...');
  
  // ========================================
  // 1. VERIFICAÇÃO DE LICENÇA
  // ========================================
  const license = loadLicense();
  const validacao = validateLicense(license);

  // Exibe informações da licença
  if (license.configuracoes?.verificar_licenca_ao_iniciar) {
    displayLicenseInfo(license);
  }

  // Se licença inválida, exibe aviso mas continua (módulos base funcionam)
  if (!validacao.valida) {
    logger.warn('⚠️ Licença inválida ou expirada. Apenas módulos base funcionarão.');
    console.log(`\n❌ ${validacao.motivo}\n`);
  }

  // Armazena licença globalmente para o router usar
  global.botLicense = license;

  // ========================================
  // 2. INICIALIZAÇÃO DO BOT
  // ========================================
  await ensureAuthFolder();

  const { state, saveCreds } = await useMultiFileAuthState(authFolder);
  const { version } = await fetchLatestBaileysVersion();

  logger.info({ version: version.join('.') }, '✅ Versão do WhatsApp Web carregada.');

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger
  });

  initRouter(sock);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      logger.info('📲 Escaneie o QR Code abaixo com o WhatsApp:');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      logger.warn({ reason: lastDisconnect?.error?.message }, '🔌 Conexão encerrada.');

      if (shouldReconnect) {
        logger.info('🔄 Tentando reconectar...');
        startBot().catch((error) => logger.error(error, 'Erro ao tentar reconectar.'));
      } else {
        logger.error('❗ Usuário deslogado. Exclua a pasta auth/ e faça o login novamente.');
      }
    }

    if (connection === 'open') {
      logger.info('✅ Bot conectado com sucesso ao WhatsApp!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify' || !Array.isArray(messages) || messages.length === 0) {
      return;
    }

    const msg = messages[0];
    const remoteJid = msg?.key?.remoteJid;

    // Log de debug para todas as mensagens recebidas
    logger.debug({ 
      remoteJid, 
      fromMe: msg?.key?.fromMe,
      type,
      hasText: !!extractMessageText(msg)
    }, 'Mensagem detectada');

    // Ignora status e grupos, processa apenas mensagens diretas
    if (!remoteJid || remoteJid === 'status@broadcast') {
      logger.debug({ remoteJid }, '⛔ Status broadcast ignorado');
      return;
    }

    // Ignora grupos - FILTRO CRÍTICO
    if (remoteJid.endsWith('@g.us')) {
      console.log(`⛔ GRUPO IGNORADO: ${remoteJid}`);
      logger.info({ remoteJid }, '⛔ GRUPO IGNORADO - Bot responde apenas mensagens diretas');
      return;
    }

    // Ignora mensagens enviadas pelo próprio bot
    if (msg?.key?.fromMe) {
      logger.debug({ remoteJid }, 'Mensagem própria ignorada');
      return;
    }

    const text = extractMessageText(msg);
    
    if (!text || !text.trim()) {
      logger.debug({ from: remoteJid }, 'Mensagem sem texto ignorada.');
      return;
    }

    logger.info({ from: remoteJid, text }, '📩 Mensagem recebida - processando...');

    try {
      await handleIncomingMessage({ from: remoteJid, message: text });
      logger.info({ from: remoteJid }, '✅ Mensagem processada com sucesso');
    } catch (error) {
      logger.error({ err: error }, '❌ Erro inesperado ao processar mensagem.');
      await sock.sendMessage(remoteJid, {
        text: 'Tive um problema ao processar sua mensagem. Vamos tentar novamente mais tarde, ok?'
      });
    }
  });
}