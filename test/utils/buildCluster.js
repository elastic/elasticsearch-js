/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const debug = require('debug')('elasticsearch-test')
const workq = require('workq')
const buildServer = require('./buildServer')

var id = 0
function buildCluster (options, callback) {
  const clusterId = id++
  debug(`Booting cluster '${clusterId}'`)
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const q = workq()
  const nodes = {}
  const sniffResult = { nodes: {} }

  options.numberOfNodes = options.numberOfNodes || 4
  for (var i = 0; i < options.numberOfNodes; i++) {
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

    buildServer(options.handler || handler, ({ port }, server) => {
      nodes[opts.id] = {
        url: `http://127.0.0.1:${port}`,
        server
      }
      sniffResult.nodes[opts.id] = {
        http: {
          publish_address: options.hostPublishAddress
            ? `localhost/127.0.0.1:${port}`
            : `127.0.0.1:${port}`
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
    debug(`Cluster '${clusterId}' booted with ${options.numberOfNodes} nodes`)
    callback(cluster)
    done()
  })
}

module.exports = buildCluster
