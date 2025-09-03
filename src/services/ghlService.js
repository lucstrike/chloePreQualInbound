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
          Authorization: `Bearer ${process.env.GHL_SUBACCOUNT_ID}`,
          'Content-Type': 'application/json',
          Version: '2021-04-15',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Move o lead para outro stage no GHL
 */
async function moveLeadStage(contactId, stageName) {
  try {
    const url = `https://services.leadconnectorhq.com/contacts/${contactId}/stages`;
    const response = await axios.put(
      url,
      {
        stageName
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_SUBACCOUNT_ID}`,
          'Content-Type': 'application/json',
          Version: '2021-04-15',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao mover lead de stage:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendMessageToGHL, moveLeadStage };
