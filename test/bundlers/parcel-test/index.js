'use strict'

const { Client } = require('../../../index')
const client = new Client({ node: 'http://localhost:9200' })
client.info((err, result) => {
  process.exit(err ? 1 : 0)
})
