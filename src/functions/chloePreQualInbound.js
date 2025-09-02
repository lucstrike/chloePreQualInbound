const ghlService = require('../services/ghlService');
const openaiService = require('../services/openaiService');

exports.handler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const body = event.body ? JSON.parse(event.body) : {};
    const message = body.message || '';
    const contactId = body.contactId || '';

    if (!message || !contactId) {
      throw new Error('Mensagem ou Contact ID não encontrado.');
    }

    console.log("Mensagem recebida:", message);
    console.log("ContactId recebido:", contactId);

    const gptResponse = await openaiService.getGPTResponse(message);
    console.log("Resposta do GPT:", gptResponse);

    const ghlResponse = await ghlService.sendMessageToGHL(contactId, gptResponse);
    console.log("Resposta do GHL:", ghlResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Resposta processada com sucesso',
        data: ghlResponse,
      }),
    };
  } catch (error) {
    console.error('Error processing the request:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao processar a solicitação',
        error: error.message,
      }),
    };
  }
};
