'use strict'

const { test } = require('tap')
const { Client } = require('../../index')
const { buildServer } = require('../utils')

test('Basic (callback)', t => {
  t.plan(2)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      host: `http://localhost:${port}`
    })

    client.search({
      index: 'test',
      type: 'doc',
      query: {
        match: { foo: 'bar' }
      }
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })
  })
})

test('Basic (promises)', t => {
  t.plan(1)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      host: `http://localhost:${port}`
    })

    client
      .search({
        index: 'test',
        type: 'doc',
        query: {
          match: { foo: 'bar' }
        }
      })
      .then(({ body }) => t.deepEqual(body, { hello: 'world' }))
      .catch(t.fail)
  })
})

test('Error (callback)', t => {
  t.plan(1)

  function handler (req, res) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      host: `http://localhost:${port}`
    })

    client.search({
      index: 'test',
      type: 'doc',
      query: {
        match: { foo: 'bar' }
      }
    }, (err, { body }) => {
      t.ok(err)
    })
  })
})

test('Error (promises)', t => {
  t.plan(1)

  function handler (req, res) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      host: `http://localhost:${port}`
    })

    client
      .search({
        index: 'test',
        type: 'doc',
        query: {
          match: { foo: 'bar' }
        }
      })
      .then(t.fail)
      .catch(err => t.ok(err))
  })
})

test('Abort method (callback)', t => {
  t.plan(3)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      host: `http://localhost:${port}`
    })

    const request = client.search({
      index: 'test',
      type: 'doc',
      query: {
        match: { foo: 'bar' }
      }
    }, (err, { body }) => {
      t.error(err)
      t.deepEqual(body, { hello: 'world' })
    })

    t.type(request.abort, 'function')
  })
})

test('Abort is not supported in promises', t => {
  t.plan(2)

  function handler (req, res) {
    res.setHeader('Content-Type', 'application/json;utf=8')
    res.end(JSON.stringify({ hello: 'world' }))
  }

  buildServer(handler, ({ port }, server) => {
    const client = new Client({
      host: `http://localhost:${port}`
    })

    const request = client.search({
      index: 'test',
      type: 'doc',
      query: {
        match: { foo: 'bar' }
      }
    })

    request
      .then(({ body }) => t.deepEqual(body, { hello: 'world' }))
      .catch(t.fail)

    t.type(request.abort, 'undefined')
  })
})
