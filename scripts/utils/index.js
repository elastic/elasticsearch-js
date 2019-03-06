'use strict'

const generate = require('./generate')
const generateRequestTypes = require('./generateRequestTypes')
const cloneAndCheckout = require('./clone-es')
const genFactory = require('./genMain')
const generateDocs = require('./generateDocs')

module.exports = {
  generate,
  cloneAndCheckout,
  genFactory,
  generateRequestTypes,
  generateDocs
}
