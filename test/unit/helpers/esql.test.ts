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

import { test } from 'tap'
import { connection } from '../../utils'
import { Client } from '../../../'

test('ES|QL helper', t => {
  test('toRecords', t => {
    t.test('Takes an ESQL response and pivots it to an array of records', async t => {
      type MyDoc = {
        '@timestamp': string,
        client_ip: string,
        event_duration: number,
        message: string,
      }

      const MockConnection = connection.buildMockConnection({
        onRequest (_params) {
          return {
            body: {
              columns: [
                { name: '@timestamp', type: 'date' },
                { name: 'client_ip', type: 'ip' },
                { name: 'event_duration', type: 'long' },
                { name: 'message', type: 'keyword' }
              ],
              values: [
                [
                  '2023-10-23T12:15:03.360Z',
                  '172.21.2.162',
                  3450233,
                  'Connected to 10.1.0.3'
                ],
                [
                  '2023-10-23T12:27:28.948Z',
                  '172.21.2.113',
                  2764889,
                  'Connected to 10.1.0.2'
                ]
              ]
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      const result = await client.helpers.esql({ query: 'FROM sample_data' }).toRecords<MyDoc>()
      const { records, columns } = result
      t.equal(records.length, 2)
      t.ok(records[0])
      t.same(records[0], {
        '@timestamp': '2023-10-23T12:15:03.360Z',
        client_ip: '172.21.2.162',
        event_duration: 3450233,
        message: 'Connected to 10.1.0.3'
      })
      t.same(columns, [
        { name: '@timestamp', type: 'date' },
        { name: 'client_ip', type: 'ip' },
        { name: 'event_duration', type: 'long' },
        { name: 'message', type: 'keyword' }
      ])
      t.end()
    })

    t.test('ESQL helper uses correct x-elastic-client-meta helper value', async t => {
      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          const header = params.headers?.['x-elastic-client-meta'] ?? ''
          t.ok(header.includes('h=qo'), `Client meta header does not include ESQL helper value: ${header}`)
          return {
            body: {
              columns: [{ name: '@timestamp', type: 'date' }],
              values: [['2023-10-23T12:15:03.360Z']],
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      await client.helpers.esql({ query: 'FROM sample_data' }).toRecords()
      t.end()
    })

    t.end()
  })
  t.end()
})
