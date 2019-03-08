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

const { Client } = require('../../index')
const { buildServer } = require('../utils')

function runAsyncTest (test) {
  test('async await (search)', t => {
    t.plan(1)

    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, async ({ port }, server) => {
      const client = new Client({
        node: `http://localhost:${port}`
      })

      try {
        const { body } = await client.search({
          index: 'test',
          type: 'doc',
          q: 'foo:bar'
        })
        t.deepEqual(body, { hello: 'world' })
      } catch (err) {
        t.fail(err)
      }
      server.stop()
    })
  })

  test('async await (index)', t => {
    t.plan(1)

    function handler (req, res) {
      res.setHeader('Content-Type', 'application/json;utf=8')
      res.end(JSON.stringify({ hello: 'world' }))
    }

    buildServer(handler, async ({ port }, server) => {
      const client = new Client({
        node: `http://localhost:${port}`
      })

      try {
        await client.index({
          index: 'test',
          body: { foo: 'bar' }
        })
        t.pass('ok')
      } catch (err) {
        t.fail(err)
      }
      server.stop()
    })
  })
}

module.exports = runAsyncTest
