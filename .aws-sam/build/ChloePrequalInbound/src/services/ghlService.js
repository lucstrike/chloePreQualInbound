const axios = require('axios');

async function sendMessageToGHL(contactId, message) {
  const url = 'https://api.gohighlevel.com/v1/conversations/messages';
  const response = await axios.post(url, {
    contactId: contactId,
    message: { text: message },
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}

async function moveLeadStage(contactId, stageName) {
  const url = 'https://api.gohighlevel.com/v1/opportunities';
  const response = await axios.put(url, {
    contactId: contactId,
    stageName: stageName,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}

module.exports = { sendMessageToGHL, moveLeadStage };
