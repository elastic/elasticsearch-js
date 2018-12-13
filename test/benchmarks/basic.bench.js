'use strict'

const bench = require('nanobench')
const { Client } = require('../../index')
const { connection } = require('../utils')

bench('Initialization', { repetitions: 5 }, b => {
  const client = new Client({ // eslint-disable-line
    node: 'http://localhost:9200'
  })
  b.end()
})

bench('Call api with lazy loading', { repetitions: 5 }, b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  b.start()
  client.info((err, result) => {
    if (err) {
      b.error(err)
      return
    }

    b.end()
  })
})

bench('Call api without lazy loading', { repetitions: 5 }, b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  client.info((err, result) => {
    if (err) {
      b.error(err)
      return
    }

    b.start()
    client.info((err, result) => {
      if (err) {
        b.error(err)
        return
      }

      b.end()
    })
  })
})

bench('Basic get', { repetitions: 5 }, b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  // we run the method twice to skip the lazy loading overhead
  client.search({
    index: 'test',
    type: 'doc',
    q: 'foo:bar'
  }, (err, result) => {
    if (err) {
      b.error(err)
      return
    }

    b.start()
    client.search({
      index: 'test',
      type: 'doc',
      q: 'foo:bar'
    }, (err, result) => {
      if (err) {
        b.error(err)
        return
      }
      b.end()
    })
  })
})

bench('Basic post', { repetitions: 5 }, b => {
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: connection.MockConnection
  })

  // we run the method twice to skip the lazy loading overhead
  client.search({
    index: 'test',
    type: 'doc',
    body: {
      query: {
        match: { foo: 'bar' }
      }
    }
  }, (err, result) => {
    if (err) {
      b.error(err)
      return
    }

    b.start()
    client.search({
      index: 'test',
      type: 'doc',
      body: {
        query: {
          match: { foo: 'bar' }
        }
      }
    }, (err, result) => {
      if (err) {
        b.error(err)
        return
      }
      b.end()
    })
  })
})
