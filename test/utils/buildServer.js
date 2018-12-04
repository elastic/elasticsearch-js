'use strict'

const stoppable = require('stoppable')

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
    ? stoppable(https.createServer(secureOpts))
    : stoppable(http.createServer())

  server.on('request', handler)
  server.on('error', err => {
    console.log('http server error', err)
    process.exit(1)
  })
  server.listen(0, () => {
    const port = server.address().port
    cb(Object.assign({}, secureOpts, { port }), server)
  })
}

module.exports = buildServer
