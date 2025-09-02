// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // seu arquivo de entrada
  target: 'node',          // importante para Lambda
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',  // arquivo final que será enviado
    libraryTarget: 'commonjs2',
  },
  externals: [], // aqui você pode deixar vazio para incluir axios e outras libs
};
