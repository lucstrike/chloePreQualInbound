require('dotenv').config();
const ghlService = require('./src/services/ghlService'); // seu service com sendMessageToGHL
const openaiService = require('./src/services/openaiService'); // seu service com getGPTResponse

(async () => {
  try {
    // 🔹 IDs de teste (substitua pelos corretos da sua conta GHL)
    const contactId = 'cksDbgpFQfbjExftceZz';
    const locationId = 'j1kE7nRUFFuN6sAfcmew';
    const message = 'Oi, quero mais informações';

    // 1️⃣ GPT gera a resposta
    const gptResponse = await openaiService.getGPTResponse(message);
    console.log('✅ GPT respondeu:', gptResponse);

    // 2️⃣ Envia a resposta para o lead no GHL
    const ghlMessageRes = await ghlService.sendMessageToGHL(contactId, gptResponse, locationId);
    console.log('✅ Mensagem enviada com sucesso:', ghlMessageRes);

  } catch (err) {
    console.error('❌ Erro no teste local:', err.response?.data || err.message);
  }
})();
