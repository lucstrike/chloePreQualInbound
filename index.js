const { handler: sendMessageHandler } = require("./src/functions-lambda/sendmessage.js");
const { handler: updatePromptHandler } = require("./src/functions-lambda/updateprompt.js");

module.exports = {
  sendMessageHandler,
  updatePromptHandler,
};
