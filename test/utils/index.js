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

const { promisify } = require('util')
const sleep = promisify(setTimeout)
const buildServer = require('./buildServer')
const buildCluster = require('./buildCluster')
const buildProxy = require('./buildProxy')
const connection = require('./MockConnection')
const { Client } = require('../../')

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

function skipProductCheck (client) {
  const tSymbol = Object.getOwnPropertySymbols(client.transport || client)
    .filter(symbol => symbol.description === 'product check')[0]
  ;(client.transport || client)[tSymbol] = 2
}

class NoProductCheckClient extends Client {
  constructor (opts) {
    super(opts)
    skipProductCheck(this)
  }
}

module.exports = {
  buildServer,
  buildCluster,
  buildProxy,
  connection,
  waitCluster,
  skipProductCheck,
  Client: NoProductCheckClient
}