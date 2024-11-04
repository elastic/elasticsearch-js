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
import * as arrow from 'apache-arrow'
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

  test('toArrowTable', t => {
    t.test('Parses a binary response into an Arrow table', async t => {
      const binaryContent = '/////zABAAAQAAAAAAAKAA4ABgANAAgACgAAAAAABAAQAAAAAAEKAAwAAAAIAAQACgAAAAgAAAAIAAAAAAAAAAIAAAB8AAAABAAAAJ7///8UAAAARAAAAEQAAAAAAAoBRAAAAAEAAAAEAAAAjP///wgAAAAQAAAABAAAAGRhdGUAAAAADAAAAGVsYXN0aWM6dHlwZQAAAAAAAAAAgv///wAAAQAEAAAAZGF0ZQAAEgAYABQAEwASAAwAAAAIAAQAEgAAABQAAABMAAAAVAAAAAAAAwFUAAAAAQAAAAwAAAAIAAwACAAEAAgAAAAIAAAAEAAAAAYAAABkb3VibGUAAAwAAABlbGFzdGljOnR5cGUAAAAAAAAAAAAABgAIAAYABgAAAAAAAgAGAAAAYW1vdW50AAAAAAAA/////7gAAAAUAAAAAAAAAAwAFgAOABUAEAAEAAwAAABgAAAAAAAAAAAABAAQAAAAAAMKABgADAAIAAQACgAAABQAAABYAAAABQAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAQAAAAAAAAAIAAAAAAAAACgAAAAAAAAAMAAAAAAAAAABAAAAAAAAADgAAAAAAAAAKAAAAAAAAAAAAAAAAgAAAAUAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAACgmZkTQAAAAGBmZiBAAAAAAAAAL0AAAADAzMwjQAAAAMDMzCtAHwAAAAAAAADV6yywkgEAANWPBquSAQAA1TPgpZIBAADV17mgkgEAANV7k5uSAQAA/////wAAAAA='

      const MockConnection = connection.buildMockConnection({
        onRequest (_params) {
          return {
            body: Buffer.from(binaryContent, 'base64'),
            statusCode: 200,
            headers: {
              'content-type': 'application/vnd.elasticsearch+arrow+stream'
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      const result = await client.helpers.esql({ query: 'FROM sample_data' }).toArrowTable()
      t.ok(result instanceof arrow.Table)

      const table = [...result]
      t.same(table[0], [
        ["amount", 4.900000095367432],
        ["date", 1729532586965],
      ])
      t.end()
    })

    t.test('ESQL helper uses correct x-elastic-client-meta helper value', async t => {
      const binaryContent = '/////zABAAAQAAAAAAAKAA4ABgANAAgACgAAAAAABAAQAAAAAAEKAAwAAAAIAAQACgAAAAgAAAAIAAAAAAAAAAIAAAB8AAAABAAAAJ7///8UAAAARAAAAEQAAAAAAAoBRAAAAAEAAAAEAAAAjP///wgAAAAQAAAABAAAAGRhdGUAAAAADAAAAGVsYXN0aWM6dHlwZQAAAAAAAAAAgv///wAAAQAEAAAAZGF0ZQAAEgAYABQAEwASAAwAAAAIAAQAEgAAABQAAABMAAAAVAAAAAAAAwFUAAAAAQAAAAwAAAAIAAwACAAEAAgAAAAIAAAAEAAAAAYAAABkb3VibGUAAAwAAABlbGFzdGljOnR5cGUAAAAAAAAAAAAABgAIAAYABgAAAAAAAgAGAAAAYW1vdW50AAAAAAAA/////7gAAAAUAAAAAAAAAAwAFgAOABUAEAAEAAwAAABgAAAAAAAAAAAABAAQAAAAAAMKABgADAAIAAQACgAAABQAAABYAAAABQAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAQAAAAAAAAAIAAAAAAAAACgAAAAAAAAAMAAAAAAAAAABAAAAAAAAADgAAAAAAAAAKAAAAAAAAAAAAAAAAgAAAAUAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAACgmZkTQAAAAGBmZiBAAAAAAAAAL0AAAADAzMwjQAAAAMDMzCtAHwAAAAAAAADV6yywkgEAANWPBquSAQAA1TPgpZIBAADV17mgkgEAANV7k5uSAQAA/////wAAAAA='

      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          const header = params.headers?.['x-elastic-client-meta'] ?? ''
          t.ok(header.includes('h=qa'), `Client meta header does not include ESQL helper value: ${header}`)
          return {
            body: Buffer.from(binaryContent, 'base64'),
            statusCode: 200,
            headers: {
              'content-type': 'application/vnd.elasticsearch+arrow+stream'
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      await client.helpers.esql({ query: 'FROM sample_data' }).toArrowTable()
      t.end()
    })

    t.end()
  })

  test('toArrowReader', t => {
    t.test('Parses a binary response into an Arrow stream reader', async t => {
      const binaryContent = '/////zABAAAQAAAAAAAKAA4ABgANAAgACgAAAAAABAAQAAAAAAEKAAwAAAAIAAQACgAAAAgAAAAIAAAAAAAAAAIAAAB8AAAABAAAAJ7///8UAAAARAAAAEQAAAAAAAoBRAAAAAEAAAAEAAAAjP///wgAAAAQAAAABAAAAGRhdGUAAAAADAAAAGVsYXN0aWM6dHlwZQAAAAAAAAAAgv///wAAAQAEAAAAZGF0ZQAAEgAYABQAEwASAAwAAAAIAAQAEgAAABQAAABMAAAAVAAAAAAAAwFUAAAAAQAAAAwAAAAIAAwACAAEAAgAAAAIAAAAEAAAAAYAAABkb3VibGUAAAwAAABlbGFzdGljOnR5cGUAAAAAAAAAAAAABgAIAAYABgAAAAAAAgAGAAAAYW1vdW50AAAAAAAA/////7gAAAAUAAAAAAAAAAwAFgAOABUAEAAEAAwAAABgAAAAAAAAAAAABAAQAAAAAAMKABgADAAIAAQACgAAABQAAABYAAAABQAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAQAAAAAAAAAIAAAAAAAAACgAAAAAAAAAMAAAAAAAAAABAAAAAAAAADgAAAAAAAAAKAAAAAAAAAAAAAAAAgAAAAUAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAACgmZkTQAAAAGBmZiBAAAAAAAAAL0AAAADAzMwjQAAAAMDMzCtAHwAAAAAAAADV6yywkgEAANWPBquSAQAA1TPgpZIBAADV17mgkgEAANV7k5uSAQAA/////wAAAAA='

      const MockConnection = connection.buildMockConnection({
        onRequest (_params) {
          return {
            body: Buffer.from(binaryContent, 'base64'),
            statusCode: 200,
            headers: {
              'content-type': 'application/vnd.elasticsearch+arrow+stream'
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      const result = await client.helpers.esql({ query: 'FROM sample_data' }).toArrowReader()
      t.ok(result.isStream())

      const recordBatch = result.next().value
      t.same(recordBatch.get(0)?.toJSON(), {
        amount: 4.900000095367432,
        date: 1729532586965,
      })
      t.end()
    })

    t.test('ESQL helper uses correct x-elastic-client-meta helper value', async t => {
      const binaryContent = '/////zABAAAQAAAAAAAKAA4ABgANAAgACgAAAAAABAAQAAAAAAEKAAwAAAAIAAQACgAAAAgAAAAIAAAAAAAAAAIAAAB8AAAABAAAAJ7///8UAAAARAAAAEQAAAAAAAoBRAAAAAEAAAAEAAAAjP///wgAAAAQAAAABAAAAGRhdGUAAAAADAAAAGVsYXN0aWM6dHlwZQAAAAAAAAAAgv///wAAAQAEAAAAZGF0ZQAAEgAYABQAEwASAAwAAAAIAAQAEgAAABQAAABMAAAAVAAAAAAAAwFUAAAAAQAAAAwAAAAIAAwACAAEAAgAAAAIAAAAEAAAAAYAAABkb3VibGUAAAwAAABlbGFzdGljOnR5cGUAAAAAAAAAAAAABgAIAAYABgAAAAAAAgAGAAAAYW1vdW50AAAAAAAA/////7gAAAAUAAAAAAAAAAwAFgAOABUAEAAEAAwAAABgAAAAAAAAAAAABAAQAAAAAAMKABgADAAIAAQACgAAABQAAABYAAAABQAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAQAAAAAAAAAIAAAAAAAAACgAAAAAAAAAMAAAAAAAAAABAAAAAAAAADgAAAAAAAAAKAAAAAAAAAAAAAAAAgAAAAUAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAACgmZkTQAAAAGBmZiBAAAAAAAAAL0AAAADAzMwjQAAAAMDMzCtAHwAAAAAAAADV6yywkgEAANWPBquSAQAA1TPgpZIBAADV17mgkgEAANV7k5uSAQAA/////wAAAAA='

      const MockConnection = connection.buildMockConnection({
        onRequest (params) {
          const header = params.headers?.['x-elastic-client-meta'] ?? ''
          t.ok(header.includes('h=qa'), `Client meta header does not include ESQL helper value: ${header}`)
          return {
            body: Buffer.from(binaryContent, 'base64'),
            statusCode: 200,
            headers: {
              'content-type': 'application/vnd.elasticsearch+arrow+stream'
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      await client.helpers.esql({ query: 'FROM sample_data' }).toArrowReader()
      t.end()
    })

    t.test('multi-batch support', async t => {
      const intType = new arrow.Uint32
      const floatType = new arrow.Float32
      const schema = new arrow.Schema([
        arrow.Field.new('id', intType),
        arrow.Field.new('val', floatType)
      ])

      function getBatch(ids: number[], vals: number[]) {
        const id = arrow.makeData({ type: intType, data: ids })
        const val = arrow.makeData({ type: floatType, data: vals })
        return new arrow.RecordBatch({ id, val })
      }

      const batch1 = getBatch([1, 2, 3], [0.1, 0.2, 0.3])
      const batch2 = getBatch([4, 5, 6], [0.4, 0.5, 0.6])
      const batch3 = getBatch([7, 8, 9], [0.7, 0.8, 0.9])

      const table = new arrow.Table(schema, [
        new arrow.RecordBatch(schema, batch1.data),
        new arrow.RecordBatch(schema, batch2.data),
        new arrow.RecordBatch(schema, batch3.data),
      ])

      const MockConnection = connection.buildMockConnection({
        onRequest (_params) {
          return {
            body: Buffer.from(arrow.tableToIPC(table, "stream")),
            statusCode: 200,
            headers: {
              'content-type': 'application/vnd.elasticsearch+arrow+stream'
            }
          }
        }
      })

      const client = new Client({
        node: 'http://localhost:9200',
        Connection: MockConnection
      })

      const result = await client.helpers.esql({ query: 'FROM sample_data' }).toArrowReader()
      t.ok(result.isStream())

      let counter = 0
      for (const batch of result) {
        for (const row of batch) {
          counter++
          const { id, val } = row.toJSON()
          t.equal(id, counter)
          // floating points are hard in JS
          t.equal((Math.round(val * 10) / 10).toFixed(1), (counter * 0.1).toFixed(1))
        }
      }
      t.end()
    })

    t.end()
  })
  t.end()
})
