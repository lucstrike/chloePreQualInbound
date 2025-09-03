const { OpenAI } = require('openai');
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();
const { defaultPrompt } = require('../prompts/chloeprompt');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT_PARAM_NAME = process.env.PROMPT_PARAM_NAME || '/chatbot/prompt';

async function getPromptFromSSM() {
  try {
    const data = await ssm.getParameter({
      Name: PROMPT_PARAM_NAME,
      WithDecryption: true,
    }).promise();
    return data.Parameter.Value;
  } catch (err) {
    // Se não encontrar, usa prompt default
    return defaultPrompt;
  }
}

async function getGPTResponse(message) {
  const promptTemplate = await getPromptFromSSM();
  const prompt = promptTemplate.replace('${message}', message);

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'system', content: prompt }],
    max_tokens: 150,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { getGPTResponse };
