require('dotenv').config();
const ghlService = require('./src/services/ghlService'); // seu service com sendMessageToGHL e moveLeadStage
const openaiService = require('./src/services/openaiService');

(async () => {
  try {
    const contactId = 'cksDbgpFQfbjExftceZz';
    const locationId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imoxa0U3blJVRkZ1TjZzQWZjbWV3IiwidmVyc2lvbiI6MSwiaWF0IjoxNzU2OTE2NDc0MDA1LCJzdWIiOiJNSmdJcHpycHVPU2FMNnNpMTBxUyJ9.p3XKPOJHon7YcTVYI1Lx0cSX1TBnUmkhT1crCru8-qs';
    const message = 'Oi, quero mais informações';

    // 1️⃣ GPT responde
    const gptResponse = await openaiService.getGPTResponse(message);
    console.log('GPT respondeu:', gptResponse);

    // 2️⃣ Envia a mensagem para o lead
    const ghlMessageRes = await ghlService.sendMessageToGHL(contactId, gptResponse, locationId);
    console.log('Mensagem enviada com sucesso:', ghlMessageRes);

    // 3️⃣ Verifica se é a primeira interação (você pode adicionar uma flag, campo ou lógica aqui)
    const isFirstInteraction = true; // substitua pela sua lógica real

    if (isFirstInteraction) {
      const stageId = '4f54c4e2-3191-4e1e-b47e-f792a1e3ff0b';
      const stageRes = await ghlService.moveLeadStage(contactId, stageId);
      console.log('Lead movido para o stage correto:', stageRes);
    }
  } catch (err) {
    console.error('Erro no teste local:', err);
  }
})();
