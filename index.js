import dotenv from 'dotenv';
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} from '@whiskeysockets/baileys';
import pino from 'pino';
import qrcode from 'qrcode-terminal';
import { handleMessage } from './handlers/messages.js';

dotenv.config();

/**
 * Inicializa a conexão com o WhatsApp usando Baileys e delega o tratamento das mensagens.
 */
async function startBot() {
  console.log('🚀 Iniciando bot de WhatsApp com IA...');

  // Controla a pasta onde as credenciais serão salvas.
  const { state, saveCreds } = await useMultiFileAuthState('./auth');

  // Baileys se mantém atualizado com a versão mais recente do WhatsApp Web.
  const { version } = await fetchLatestBaileysVersion();
  console.log('✅ Versão do WhatsApp Web carregada:', version.join('.'));

  // Cria o socket com autenticação e logger amigável para iniciantes.
  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'error' })
  });

  // Mostra o QR Code para parear o dispositivo na primeira conexão.
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr: qrCode } = update;

    if (qrCode) {
      console.log('\n📲 Escaneie o QR Code abaixo com o WhatsApp:');
  qrcode.generate(qrCode, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log('🔌 Conexão encerrada:', lastDisconnect?.error?.message);

      if (shouldReconnect) {
        console.log('🔄 Tentando reconectar...');
        startBot();
      } else {
        console.log('❗ Usuário deslogado. Exclua a pasta auth/ e faça o login novamente.');
      }
    }

    if (connection === 'open') {
      console.log('✅ Bot conectado com sucesso ao WhatsApp!');
    }
  });

  // Salva credenciais sempre que o Baileys atualizar as informações de login.
  sock.ev.on('creds.update', saveCreds);

  // Recebe e processa novas mensagens.
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify' || !Array.isArray(messages) || messages.length === 0) {
      return;
    }

    const msg = messages[0];
    const remoteJid = msg?.key?.remoteJid;

    // Ignora mensagens de status ou conversas inválidas.
    if (!remoteJid || remoteJid === 'status@broadcast') {
      return;
    }

    // Extraímos o conteúdo textual das mensagens comuns.
    const messageText =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      '';

    console.log(`📩 Mensagem recebida de ${remoteJid}:`, messageText);

    await handleMessage(messageText, sock, remoteJid);
  });
}

startBot().catch((error) => {
  console.error('❌ Erro fatal ao iniciar o bot:', error);
  process.exit(1);
});
