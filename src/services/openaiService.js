const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Chave da OpenAI via env
});

async function getGPTResponse(message) {
  const prompt = `Responda de forma amigável e educada para o cliente: "${message}"`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4', // ou gpt-3.5
    messages: [{ role: 'system', content: prompt }],
    max_tokens: 150,
  });
  
  return response.choices[0].message.content.trim();
}

module.exports = { getGPTResponse };
