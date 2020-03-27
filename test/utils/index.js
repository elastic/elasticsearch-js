// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const { promisify } = require('util')
const sleep = promisify(setTimeout)
const buildServer = require('./buildServer')
const buildCluster = require('./buildCluster')
const connection = require('./MockConnection')

async function waitCluster (client, waitForStatus = 'green', timeout = '50s', times = 0) {
  if (!client) {
    throw new Error('waitCluster helper: missing client instance')
  }
  try {
    await client.cluster.health({ waitForStatus, timeout })
  } catch (err) {
    if (++times < 10) {
      await sleep(5000)
      return waitCluster(client, waitForStatus, timeout, times)
    }
    throw err
  }
}

module.exports = {
  buildServer,
  buildCluster,
  connection,
  waitCluster
}
