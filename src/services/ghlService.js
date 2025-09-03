const axios = require('axios');

/**
 * Envia uma mensagem para um contato no GHL usando Private Integration
 * @param {string} contactId - ID do contato no GHL
 * @param {string} message - Texto da mensagem
 * @returns {object} - Resposta da API do GHL
 */
async function sendMessageToGHL(contactId, message) {
  try {
    const url = 'https://services.leadconnectorhq.com/conversations/messages';
    const response = await axios.post(
      url,
      {
        contactId: contactId,
        message: { text: message },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-04-15', // Obrigatório para Private Integrations
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error; // permite tratar o erro no handler
  }
}

/**
 * Move um lead para outra fase no pipeline usando Private Integration
 * @param {string} contactId - ID do contato no GHL
 * @param {string} stageName - Nome da fase do pipeline
 * @returns {object} - Resposta da API do GHL
 */
async function moveLeadStage(contactId, stageName) {
  try {
    const url = 'https://services.leadconnectorhq.com/opportunities';
    const response = await axios.put(
      url,
      {
        contactId: contactId,
        stageName: stageName,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-04-15', // Obrigatório para Private Integrations
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao mover lead:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendMessageToGHL, moveLeadStage };