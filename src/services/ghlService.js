const axios = require('axios');

/**
 * Envia uma mensagem para um contato no GHL usando Private Integration
 */
async function sendMessageToGHL(contactId, message, locationId) {
  try {
    const url = 'https://services.leadconnectorhq.com/conversations/messages';
    const response = await axios.post(
      url,
      {
        contactId,
        message,
        type: 'WhatsApp',
        locationId
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_SUBACCOUNT_ID}`,
          'Content-Type': 'application/json',
          Version: '2021-04-15',
        },
      }
    );

    console.log('Mensagem enviada com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendMessageToGHL };
