const DefinePlugin = require('webpack/lib/DefinePlugin')
const { ignoreLoader, rel } = require('./lib')

module.exports = {
  context: rel(''),
  entry: './test/unit/browser_entry.js',
  output: {
    filename: 'tests.js',
    path: rel(''),
  },
  module: {
    loaders: [
      ignoreLoader([]),
    ],
    noParse: [
      /sinon/
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': '"test"',
    }),
  ],
  resolve: {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  }
}
