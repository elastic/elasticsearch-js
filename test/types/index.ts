'use strict'

import {
  Client,
  ApiResponse,
  EventMeta,
  SniffMeta,
  ResurrectMeta,
  events
} from '../../index'

const client = new Client({ node: 'http://localhost:9200' })

client.on(events.REQUEST, (err: Error | null, meta: EventMeta) => {})
client.on(events.RESPONSE, (err: Error | null, meta: EventMeta) => {})
client.on(events.SNIFF, (err: Error | null, meta: SniffMeta) => {})
client.on(events.RESURRECT, (err: Error | null, meta: ResurrectMeta) => {})

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
