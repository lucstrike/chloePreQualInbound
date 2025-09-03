const openaiService = require('../services/openaiService');
const ghlService = require('../services/ghlService');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const message = body.message;
    const contactId = body.contactId;

    const gptResponse = await openaiService.getGPTResponse(message);
    const ghlResponse = await ghlService.sendMessageToGHL(contactId, gptResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Sucesso', data: ghlResponse }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao processar', error: error.message }),
    };
  }
};
