const openaiService = require('../services/openaiService');
const ghlService = require('../services/ghlService');

exports.handler = async (event) => {
  const response = { status: '', message: '', data: null, error: null };

  try {
    response.status = 'Recebendo payload';
    const body = JSON.parse(event.body);
    const { message, contactId, stageName } = body;

    if (!message || !contactId) {
      response.status = 'Falha de validação';
      response.error = 'Campos obrigatórios ausentes: message e contactId';
      return {
        statusCode: 400,
        body: JSON.stringify(response),
      };
    }

    response.status = 'Chamando OpenAI';
    const gptResponse = await openaiService.getGPTResponse(message);
    response.status = 'OpenAI respondeu';
    response.data = { gptResponse };

    response.status = 'Enviando mensagem para GHL';
    const ghlResponse = await ghlService.sendMessageToGHL(contactId, gptResponse);
    response.status = 'Mensagem enviada para GHL';
    response.data.ghlResponse = ghlResponse;

    if (stageName) {
      response.status = 'Atualizando estágio do lead';
      const stageResponse = await ghlService.moveLeadStage(contactId, stageName);
      response.status = 'Estágio atualizado';
      response.data.stageResponse = stageResponse;
    }

    response.status = 'Sucesso';
    response.message = 'Processamento concluído';
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Erro no handler:', error);
    response.status = 'Erro';
    response.error = error.message;
    return {
      statusCode: 500,
      body: JSON.stringify(response),
    };
  }
};
