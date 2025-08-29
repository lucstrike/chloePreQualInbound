// Importa os serviços necessários
const ghlService = require('../services/ghlService');
const openaiService = require('../services/openaiService');

// Função principal que a Lambda irá chamar
exports.handler = async (event) => {
  try {
    // Log para depuração
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // Extrair dados do evento (dados do Webhook do GHL)
    const message = event.body ? JSON.parse(event.body).message : '';
    const contactId = event.body ? JSON.parse(event.body).contactId : '';

    if (!message || !contactId) {
      throw new Error('Mensagem ou Contact ID não encontrado.');
    }

    // Enviar mensagem para o GPT (openaiService)
    const gptResponse = await openaiService.getGPTResponse(message);

    // Enviar a resposta do GPT de volta para o GHL
    const ghlResponse = await ghlService.sendMessageToGHL(contactId, gptResponse);

    // Retornar a resposta ao GHL
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
