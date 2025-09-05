const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

const PROMPT_PARAM_NAME = process.env.PROMPT_PARAM_NAME || '/chatbot/prompt';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'meuTokenSecreto';

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Verifica token simples
    if (!body.token || body.token !== ADMIN_TOKEN) {
      return { statusCode: 403, body: 'Token inválido' };
    }

    if (!body.prompt) {
      return { statusCode: 400, body: 'Prompt não fornecido' };
    }

    await ssm.putParameter({
      Name: PROMPT_PARAM_NAME,
      Value: body.prompt,
      Type: 'String',
      Overwrite: true,
    }).promise();

    return {
      statusCode: 200,
      body: 'Prompt atualizado com sucesso',
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
