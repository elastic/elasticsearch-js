// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { ConfigurationError } = require('./errors')

function getAuth (nodes) {
  nodes = nodes || []
  nodes = Array.isArray(nodes) ? nodes : [nodes]

  for (const node of nodes) {
    const auth = getUsernameAndPassword(node)
    if (auth.username) return auth
  }

  return null

  function getUsernameAndPassword (node) {
    let it = node && (node.url || node)
    try {
      it = it instanceof URL ? it : new URL((it && it.toString()))
    } catch (e) {
      throw new ConfigurationError(`invalid url in option "node${node.url ? '.url' : ''}": ${e.message}`)
    }

    return {
      username: decodeURIComponent(it.username),
      password: decodeURIComponent(it.password)
    }
  }
}

module.exports = {
  getAuth
}
