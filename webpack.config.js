const path = require('path');

module.exports = {
  entry: {
    sendMessage: path.resolve(__dirname, 'src/functions/sendMessage.js'),
    updatePrompt: path.resolve(__dirname, 'src/functions/updatePrompt.js'),
  },
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
};
