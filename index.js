const { handler: sendMessageHandler } = require("./src/functions/sendmessage.js");
const { handler: updatePromptHandler } = require("./src/functions/updateprompt.js");

module.exports = {
  sendMessageHandler,
  updatePromptHandler,
};
