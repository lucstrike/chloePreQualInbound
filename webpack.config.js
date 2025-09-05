const path = require('path');

module.exports = {
  entry: {
    sendMessage: path.resolve(__dirname, 'src/functions-lambda/sendMessage.js'),
    updatePrompt: path.resolve(__dirname, 'src/functions-lambda/updatePrompt.js'),
  },
  target: 'node',          // Lambda roda Node.js
  mode: 'production',      // produção = minificado
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // cria sendMessage.js e updatePrompt.js
    libraryTarget: 'commonjs2', // compatível com Lambda
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  externals: [],           // se quiser, pode listar libs que não precisam ser bundladas (ex: aws-sdk)
};
