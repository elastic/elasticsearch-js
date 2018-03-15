const webpack = require('webpack')
const { jsLoader, ignoreLoader, rel } = require('./lib')

module.exports = {
  context: rel('src'),
  entry: './elasticsearch.js',
  output: {
    filename: 'elasticsearch.js',
    path: rel('dist'),
    library: 'elasticsearch',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      jsLoader(),
      ignoreLoader([
        'src/lib/connectors/jquery.js',
        'src/lib/connectors/angular.js'
      ]),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
}
