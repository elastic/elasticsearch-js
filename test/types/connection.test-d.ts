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

import { expectType } from 'tsd'
import { URL } from 'url'
import { Connection } from '../../'
import { ConnectionOptions } from '../../lib/Connection'

{
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
}

{
  const conn = new Connection({
    url: new URL('http://localhost:9200'),
    agent (opts) {
      expectType<ConnectionOptions>(opts)
      return 'the agent'
    }
  })
}
