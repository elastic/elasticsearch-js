'use strict'

import {
  Client,
  ApiResponse,
  EventMeta,
  SniffMeta,
  events
} from '../../index'

const client = new Client({ node: 'http://localhost:9200' })

client.on(events.REQUEST, (meta: EventMeta) => {})
client.on(events.RESPONSE, (meta: EventMeta) => {})
client.on(events.ERROR, (err: Error, meta: EventMeta) => {})
client.on(events.SNIFF, (err: Error, meta: SniffMeta) => {})

// Callbacks
client.info((err: Error | null, result: ApiResponse) => {})

client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
}, (err: Error | null, result: ApiResponse) => {})

// Promises
client.info()
  .then((result: ApiResponse) => {})
  .catch((err: Error) => {})

client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
})
  .then((result: ApiResponse) => {})
  .catch((err: Error) => {})
