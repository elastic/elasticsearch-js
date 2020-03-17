// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType, expectAssignable } from 'tsd'
import { URL } from 'url'
import {
  BaseConnectionPool,
  ConnectionPool,
  CloudConnectionPool,
  Connection
} from '../../'

{
  const pool = new BaseConnectionPool({
    Connection: Connection,
    ssl: { ca: 'stirng' },
    emit: (event, ...args) => true,
    agent: { keepAlive: true },
    auth: { username: 'username', password: 'password' }
  })

  expectType<BaseConnectionPool>(pool)
  expectType<Connection[]>(pool.connections)
  expectType<number>(pool.size)

  expectType<BaseConnectionPool>(pool.markAlive(new Connection()))
  expectType<BaseConnectionPool>(pool.markDead(new Connection()))
  expectType<Connection | null>(pool.getConnection({
    filter (node) { return true },
    selector (connections) { return connections[0] },
    requestId: 'id',
    name: 'name',
    now: Date.now()
  }))
  expectType<Connection>(pool.addConnection({}))
  expectType<BaseConnectionPool>(pool.removeConnection(new Connection()))
  expectType<BaseConnectionPool>(pool.empty())
  expectType<BaseConnectionPool>(pool.update([]))
  expectType<any[]>(pool.nodesToHost([], 'https'))
  expectType<{ url: URL }>(pool.urlToHost('url'))
}

{
  const pool = new ConnectionPool({
    Connection: Connection,
    ssl: { ca: 'stirng' },
    emit: (event, ...args) => true,
    agent: { keepAlive: true },
    auth: { username: 'username', password: 'password' },
    pingTimeout: 1000,
    resurrectStrategy: 'ping',
    sniffEnabled: true
  })

  expectAssignable<ConnectionPool>(pool)
  expectType<Connection[]>(pool.connections)
  expectType<number>(pool.size)
  expectType<string[]>(pool.dead)

  expectAssignable<ConnectionPool>(pool.markAlive(new Connection()))
  expectAssignable<ConnectionPool>(pool.markDead(new Connection()))
  expectType<Connection | null>(pool.getConnection({
    filter (node) { return true },
    selector (connections) { return connections[0] },
    requestId: 'id',
    name: 'name',
    now: Date.now()
  }))
  expectType<Connection>(pool.addConnection({}))
  expectAssignable<ConnectionPool>(pool.removeConnection(new Connection()))
  expectAssignable<ConnectionPool>(pool.empty())
  expectAssignable<ConnectionPool>(pool.update([]))
  expectType<any[]>(pool.nodesToHost([], 'https'))
  expectType<{ url: URL }>(pool.urlToHost('url'))
  expectType<void>(pool.resurrect({
    now: Date.now(),
    requestId: 'id',
    name: 'name'
  }))
}

{
  const pool = new CloudConnectionPool({
    Connection: Connection,
    ssl: { ca: 'stirng' },
    emit: (event, ...args) => true,
    agent: { keepAlive: true },
    auth: { username: 'username', password: 'password' }
  })

  expectAssignable<CloudConnectionPool>(pool)
  expectType<Connection | null>(pool.cloudConnection)
  expectType<Connection | null>(pool.getConnection())
}
