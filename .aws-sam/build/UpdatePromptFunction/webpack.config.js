const path = require('path');

module.exports = {
  entry: './src/functions-lambda/sendmessage.js', // seu handler
  target: 'node',
  mode: 'production',
  output: {
  path: path.resolve(__dirname), // raiz do projeto
  filename: 'index.js',
  libraryTarget: 'commonjs2',
},
  externals: [], // IMPORTANTE: não excluir axios do bundle
};