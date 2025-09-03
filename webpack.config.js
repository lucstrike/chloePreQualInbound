const path = require('path');

module.exports = [
  {
    entry: './src/functions/sendMessage.js',
    target: 'node',
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist/sendMessage'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    externals: [], // deixe axios, openai, etc
  },
  {
    entry: './src/functions/updatePrompt.js',
    target: 'node',
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist/updatePrompt'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    externals: [],
  },
];
