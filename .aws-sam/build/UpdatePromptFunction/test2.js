const { sendMessageHandler } = require('./index'); // ajuste o caminho

const event = {
  body: JSON.stringify({
    message: "Olá",
    contactId: "123",
    locationId: "456"
  })
};

sendMessageHandler(event).then(response => {
  console.log(response);
}).catch(err => {
  console.error(err);
});
