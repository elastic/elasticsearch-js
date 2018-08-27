'use strict'

const http = require('http')

function buildServer (handler, cb) {
  const server = http.createServer(handler)
  server.listen(0, () => {
    server.unref()
    cb(server.address().port, server)
  })
}

module.exports = buildServer
