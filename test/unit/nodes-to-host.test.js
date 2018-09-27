'use strict'

const { test } = require('tap')
const nodesToHost = require('../../src/lib/nodes_to_host')

const nodes09 = require('../utils/fixtures/short_node_list.0.90.json')
const nodes10 = require('../utils/fixtures/short_node_list.1.0.json')
const nodes20 = require('../utils/fixtures/short_node_list.2.0.json')
const nodes50 = require('../utils/fixtures/short_node_list.5.0.json')

test('0.x style', t => {
  t.plan(1)
  t.deepEqual(nodesToHost(nodes09), [
    {
      host: '192.168.1.1',
      port: 9400,
      _meta: {
        id: 'id1',
        name: 'name1',
        version: '0.90.14-SNAPSHOT'
      }
    },
    {
      host: 'localhost',
      port: 9440,
      _meta: {
        id: 'id2',
        name: 'name2',
        version: '0.90.14-SNAPSHOT'
      }
    }
  ])
})

test('1.x style', t => {
  t.plan(1)
  t.deepEqual(nodesToHost(nodes10), [
    {
      host: '10.10.10.100',
      port: 9205,
      _meta: {
        id: 'id1',
        name: 'name1',
        version: '1.0.4-SNAPSHOT'
      }
    },
    {
      host: 'published.hostname',
      port: 9205,
      _meta: {
        id: 'id2',
        name: 'name2',
        version: '1.0.4-SNAPSHOT'
      }
    }
  ])
})

test('2.x style', t => {
  t.plan(1)
  t.deepEqual(nodesToHost(nodes20), [
    {
      host: '127.0.0.1',
      port: 9400,
      _meta: {
        id: 'id1',
        name: 'name1',
        version: '2.0.3-SNAPSHOT'
      }
    },
    {
      host: 'published.hostname',
      port: 9400,
      _meta: {
        id: 'id2',
        name: 'name2',
        version: '2.0.3-SNAPSHOT'
      }
    }
  ])
})

test('5.x style', t => {
  t.plan(1)
  t.deepEqual(nodesToHost(nodes50), [
    {
      host: '127.0.0.1',
      port: 9400,
      _meta: {
        id: 'id1',
        name: 'name1',
        version: '5.0.3'
      }
    },
    {
      host: 'published.hostname',
      port: 9440,
      _meta: {
        id: 'id2',
        name: 'name2',
        version: '5.0.3'
      }
    }
  ])
})

test('Should ignore hosts that don\'t have an http_host property', t => {
  t.plan(1)
  const hosts = nodesToHost({
    node_id: {
      not: 'much of a node'
    }
  })
  t.strictEqual(hosts.length, 0)
})

test('Should throw if the host property is not formatted properly', t => {
  t.plan(1)
  try {
    nodesToHost({
      node_id: {
        http: {
          publish_address: 'not actually an http host'
        }
      }
    })
  } catch (err) {
    t.true(/^Malformed http.publish_address/.test(err.message))
  }
})
