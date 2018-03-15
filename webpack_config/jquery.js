const webpack = require('webpack')
const { jsLoader, ignoreLoader, rel } = require('./lib')

module.exports = {
  context: rel('src'),
  entry: './elasticsearch.jquery.js',
  output: {
    filename: 'elasticsearch.jquery.js',
    path: rel('dist'),
  },
  module: {
    rules: [
      jsLoader(),
      ignoreLoader([
        'src/lib/connectors/angular.js',
        'src/lib/connectors/xhr.js',
        'promise/lib/es6-extensions',
      ]),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
}
