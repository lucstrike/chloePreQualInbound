// index.js
const { handler: sendMessageHandler } = require("./src/functions-lambda/sendmessage.js");
const { handler: updatePromptHandler } = require("./src/functions-lambda/updateprompt.js");

/**
 * Função Lambda única que roteia para a função correta
 * com base no campo `type` enviado no evento.
 * 
 * Exemplo de evento JSON:
 * {
 *   "type": "sendMessage",
 *   "body": {
 *      "message": "Olá",
 *      "contactId": "123",
 *      "locationId": "abc"
 *   }
 * }
 */
exports.handler = async (event) => {
  try {
    const type = event.type || (event.body && JSON.parse(event.body).type);

    if (!type) {
      return { statusCode: 400, body: "Campo 'type' obrigatório no evento" };
    }

    switch (type) {
      case "sendMessage":
        return await sendMessageHandler(event);

      case "updatePrompt":
        return await updatePromptHandler(event);

      default:
        return { statusCode: 400, body: `Tipo desconhecido: ${type}` };
    }
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
