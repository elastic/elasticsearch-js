'use strict'

const { test } = require('tap')
const { Client, errors } = require('../../')
const Mock = require('@elastic/elasticsearch-mock')

test('Mock should work', async t => {
  t.plan(1)

  const mock = new Mock()
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: mock.getConnection()
  })

  // TODO: remove this once https://github.com/elastic/elasticsearch-js-mock/pull/20 lands
  mock.add({
    method: 'GET',
    path: '/'
  }, () => {
    return {
      name: '1ef419078577',
      cluster_name: 'docker-cluster',
      cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
      version: {
        number: '7.13.0-SNAPSHOT',
        build_flavor: 'default',
        build_type: 'docker',
        build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
        build_date: '2021-07-10T01:45:02.136546168Z',
        build_snapshot: true,
        lucene_version: '8.9.0',
        minimum_wire_compatibility_version: '7.15.0',
        minimum_index_compatibility_version: '7.0.0'
      },
      tagline: 'You Know, for Search'
    }
  })

  mock.add({
    method: 'GET',
    path: '/_cat/indices'
  }, () => {
    return { status: 'ok' }
  })

  const response = await client.cat.indices()
  t.same(response.body, { status: 'ok' })
})

test('Return an error', async t => {
  t.plan(1)

  const mock = new Mock()
  const client = new Client({
    node: 'http://localhost:9200',
    Connection: mock.getConnection()
  })

  // TODO: remove this once https://github.com/elastic/elasticsearch-js-mock/pull/20 lands
  mock.add({
    method: 'GET',
    path: '/'
  }, () => {
    return {
      name: '1ef419078577',
      cluster_name: 'docker-cluster',
      cluster_uuid: 'cQ5pAMvRRTyEzObH4L5mTA',
      version: {
        number: '7.13.0-SNAPSHOT',
        build_flavor: 'default',
        build_type: 'docker',
        build_hash: '5fb4c050958a6b0b6a70a6fb3e616d0e390eaac3',
        build_date: '2021-07-10T01:45:02.136546168Z',
        build_snapshot: true,
        lucene_version: '8.9.0',
        minimum_wire_compatibility_version: '7.15.0',
        minimum_index_compatibility_version: '7.0.0'
      },
      tagline: 'You Know, for Search'
    }
  })

  mock.add({
    method: 'GET',
    path: '/_cat/indices'
  }, () => {
    return new errors.ResponseError({
      body: { errors: {}, status: 500 },
      statusCode: 500
    })
  })

  try {
    await client.cat.indices()
    t.fail('Should throw')
  } catch (err) {
    t.ok(err instanceof errors.ResponseError)
  }
})
