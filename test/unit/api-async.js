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
