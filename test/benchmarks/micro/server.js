'use strict'

const assert = require('assert')
const http = require('http')

const { Client } = require('../../../index')
const { connection } = require('../../utils')

const nodes = []
for (var port = 9200; port < 10200; port++) {
  nodes.push(`http://localhost:${port}`)
}

const client = new Client({
  nodes,
  Connection: connection.MockConnection
})

assert.strictEqual(client.connectionPool.connections.size, 1000)

function handler (req, res) {
  client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  }, (err, result) => {
    if (err) {
      res.statusCode = 500
      res.end('not ok')
    } else {
      res.end('ok')
    }
  })
}

http.createServer(handler).listen(3000)
