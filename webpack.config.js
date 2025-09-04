const path = require('path');

module.exports = {
    entry: {
    sendMessage: path.resolve(__dirname, './src/functions/sendMessage.js'),
    updatePrompt: path.resolve(__dirname, './src/functions/updatePrompt.js'),
  },
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',       // nome do bundle será sendMessage.js e updatePrompt.js
    libraryTarget: 'commonjs2',
  },
  externals: [], // deixe axios, openai, etc., se precisar bundlar
}