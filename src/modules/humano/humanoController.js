import logger from '../../utils/logger.js';

/**
 * Transfere o atendimento para um operador humano.
 * Envia mensagens de confirmação ao usuário.
 * 
 * @param {string} chatId - ID do chat do usuário.
 */
export async function transferToHuman(chatId) {
  if (typeof global.sendWhatsApp !== 'function') {
    throw new Error('Função global sendWhatsApp não configurada.');
  }

  try {
    await global.sendWhatsApp(chatId, 'Ok! Vou te encaminhar para um atendente humano.');
    
    // Pequeno delay para parecer mais natural
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    await global.sendWhatsApp(chatId, 'Por favor aguarde alguns instantes...');
    
    logger.info({ chatId }, 'Usuário transferido para atendimento humano.');
    
    // TODO: Integrar com sistema de tickets, CRM ou notificação para equipe
    // Exemplos de integrações futuras:
    // - Enviar notificação para equipe via webhook
    // - Criar ticket no sistema de suporte
    // - Adicionar chat na fila de atendimento
    // - Registrar em banco de dados
    
  } catch (error) {
    logger.error({ err: error, chatId }, 'Erro ao transferir para atendente humano.');
    await global.sendWhatsApp(
      chatId,
      'Desculpe, houve um problema ao processar sua solicitação. Tente novamente em alguns instantes.'
    );
  }
}
