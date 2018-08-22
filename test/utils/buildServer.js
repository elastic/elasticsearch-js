'use strict'

const http = require('http')

function buildServer (handler, cb) {
  const server = http.createServer(handler)
  server.listen(0, () => {
    cb(server.address().port, server)
  })
}

module.exports = buildServer
