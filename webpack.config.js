const path = require('path');

module.exports = {
  entry: './src/functions/handler.js', // caminho correto do seu handler
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
};
