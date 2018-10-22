'use strict'

// allow self signed certificates for testing purposes
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const { readFileSync } = require('fs')
const { join } = require('path')
const https = require('https')
const http = require('http')

const secureOpts = {
  key: readFileSync(join(__dirname, '..', 'fixtures', 'https.key'), 'utf8'),
  cert: readFileSync(join(__dirname, '..', 'fixtures', 'https.cert'), 'utf8')
}

function buildServer (handler, opts, cb) {
  if (cb == null) {
    cb = opts
    opts = {}
  }

  const server = opts.secure
    ? https.createServer(secureOpts)
    : http.createServer()

  server.on('request', handler)
  server.listen(0, () => {
    server.unref()
    const port = server.address().port
    cb(Object.assign({}, secureOpts, { port }), server)
  })
}

module.exports = buildServer
