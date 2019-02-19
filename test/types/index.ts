'use strict'

import {
  Client,
  ApiResponse,
  EventMeta,
  SniffMeta,
  ResurrectMeta,
  events,
  ClientExtendsCallbackOptions
} from '../../index'

import { TransportRequestParams, TransportRequestOptions } from '../../lib/Transport'

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

// request options
client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
}, {
  maxRetries: 2,
  ignore: [404],
  requestTimeout: 2000
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

// request options
client.index({
  index: 'test',
  type: 'test',
  id: 'test',
  body: { hello: 'world' }
}, {
  maxRetries: 2,
  ignore: [404],
  requestTimeout: 2000
})
  .then((result: ApiResponse) => {})
  .catch((err: Error) => {})

// extend client
client.extend('namespace.method', (options: ClientExtendsCallbackOptions) => {
  return function (params: any) {
    const requestParams: TransportRequestParams = {
      method: 'GET',
      path: '/',
      querystring: {}
    }

    const requestOptions: TransportRequestOptions = {
      ignore: [404],
      maxRetries: 5
    }

    return options.makeRequest(requestParams, requestOptions)
  }
})
