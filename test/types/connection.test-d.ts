// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

import { expectType } from 'tsd'
import { URL } from 'url'
import { Connection } from '../../'

const conn = new Connection({
  url: new URL('http://localhost:9200'),
  ssl: { ca: 'string' },
  id: 'id',
  headers: {},
  agent: { keepAlive: false },
  status: 'alive',
  roles: { master: true },
  auth: { username: 'username', password: 'password' }
})

expectType<Connection>(conn)
expectType<URL>(conn.url)
expectType<string>(conn.id)
expectType<Record<string, any>>(conn.headers)
expectType<number>(conn.deadCount)
expectType<number>(conn.resurrectTimeout)
expectType<string>(conn.status)
