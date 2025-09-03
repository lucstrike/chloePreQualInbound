const { handler } = require("./src/functions/sendmessage"); // ajuste se necessário

async function run() {
  const event = {
    body: JSON.stringify({
      message: "Teste de integração OpenAI -> GHL",
      contactId: "123456789",
      stageName: "Novo Stage"
    })
  };

  const result = await handler(event);
  console.log("Resultado:", result);
}

run().catch(console.error);
