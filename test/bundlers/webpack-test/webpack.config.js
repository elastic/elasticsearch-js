'use strict'

const path = require('path')

module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  }
}
