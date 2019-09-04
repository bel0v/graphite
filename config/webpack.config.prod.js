const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'graphite.min.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'graphite',
    libraryExport: 'default',
    libraryTarget: 'var'
  }
}
