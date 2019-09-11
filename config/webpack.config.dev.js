const path = require('path')

module.exports = {
  mode: 'development',
  entry: './lib/index.js',
  output: {
    filename: 'graphite.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'graphite',
    libraryExport: 'default',
    libraryTarget: 'var'
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '../examples'),
    compress: false,
    port: 9000
  }
}
