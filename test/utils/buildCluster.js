'use strict'

const debug = require('debug')('elasticsearch-test')
const workq = require('workq')
const buildServer = require('./buildServer')

var id = 0
function buildCluster (opts, callback) {
  const clusterId = id++
  debug(`Booting cluster '${clusterId}'`)
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
      debug(`Booted cluster node '${opts.id}' on port ${port} (cluster id: '${clusterId}')`)
      done()
    })
  }

  function shutdown () {
    debug(`Shutting down cluster '${clusterId}'`)
    Object.keys(nodes).forEach(kill)
  }

  function kill (id) {
    debug(`Shutting down cluster node '${id}' (cluster id: '${clusterId}')`)
    nodes[id].server.stop()
    delete nodes[id]
    delete sniffResult.nodes[id]
  }

  function spawn (id, callback) {
    debug(`Spawning cluster node '${id}' (cluster id: '${clusterId}')`)
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
    debug(`Cluster '${clusterId}' booted with ${opts.numberOfNodes} nodes`)
    callback(cluster)
    done()
  })
}

module.exports = buildCluster
