const ghlService = require('../services/ghlService');
const openaiService = require('../services/openaiService');

module.exports.handler = async (event) => {

  try {
    const { message, contactId, locationId } = JSON.parse(event.body);

    if (!message || !contactId || !locationId) {
      return { statusCode: 400, body: 'Campos obrigatórios ausentes' };
    }

    // Chama o GPT
    const gptResponse = await openaiService.getGPTResponse(message);

    // Envia a mensagem para o GHL
    const ghlResponse = await ghlService.sendMessageToGHL(contactId, gptResponse, locationId);

    // Aqui você pode mover o lead automaticamente
    const stageResponse = await ghlService.moveLeadStage(contactId, "Conectado - IA John");

    return {
      statusCode: 200,
      body: JSON.stringify({ gptResponse, ghlResponse, stageResponse }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
