// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const generate = require('./generateApis')
const generateRequestTypes = require('./generateRequestTypes')
const cloneAndCheckout = require('./clone-es')
const genFactory = require('./generateMain')
const generateDocs = require('./generateDocs')

module.exports = {
  generate,
  cloneAndCheckout,
  genFactory,
  generateRequestTypes,
  generateDocs
}
