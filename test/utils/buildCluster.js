'use strict'

const workq = require('workq')
const buildServer = require('./buildServer')

function buildCluster (opts, callback) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  }

  const q = workq()
  const nodes = {}
  const sniffResult = { nodes: {} }

  opts.numberOfNodes = opts.numberOfNodes || 4
  for (var i = 0; i < opts.numberOfNodes; i++) {
    q.add(bootNode, { id: `node${i}` })
  }

  function bootNode (q, opts, done) {
    function handler (req, res) {
      res.setHeader('content-type', 'application/json')
      if (req.url === '/_nodes/_all/http') {
        res.end(JSON.stringify(sniffResult))
      } else {
        res.end(JSON.stringify({ hello: 'world' }))
      }
    }

    buildServer(handler, ({ port }, server) => {
      nodes[opts.id] = {
        url: `http://localhost:${port}`,
        server
      }
      sniffResult.nodes[opts.id] = {
        http: {
          publish_address: `http://localhost:${port}`
        },
        roles: ['master', 'data', 'ingest']
      }
      done()
    })
  }

  function shutdown () {
    Object.keys(nodes).forEach(id => {
      nodes[id].server.stop()
    })
  }

  function kill (id) {
    nodes[id].server.stop()
    delete nodes[id]
    delete sniffResult.nodes[id]
  }

  function spawn (id, callback) {
    q.add(bootNode, { id })
    q.add((q, done) => {
      callback()
      done()
    })
  }

  const cluster = {
    nodes,
    shutdown,
    kill,
    spawn
  }

  q.drain(done => {
    callback(cluster)
    done()
  })
}

module.exports = buildCluster
