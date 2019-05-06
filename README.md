<img align="right" width="auto" height="auto" src="https://www.elastic.co/static-res/images/elastic-logo-200.png">

# @elastic/elasticsearch

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://clients-ci.elastic.co/job/elastic+elasticsearch-js+master/badge/icon)](https://clients-ci.elastic.co/job/elastic+elasticsearch-js+master/)  [![codecov](https://codecov.io/gh/elastic/elasticsearch-js/branch/master/graph/badge.svg)](https://codecov.io/gh/elastic/elasticsearch-js)  [![NPM downloads](https://img.shields.io/npm/dm/@elastic/elasticsearch.svg?style=flat)](https://www.npmjs.com/package/@elastic/elasticsearch)

---

**Note:** In the past months we have worked on the new Elasticsearch Node.js client, and if you want you can already try it by following the instructions below, while if you're going to use the legacy one or report an issue, please check out [elastic/elasticsearch-js-legacy](https://github.com/elastic/elasticsearch-js-legacy).

---

The official Node.js client for Elasticsearch.

## Features
- One-to-one mapping with REST API.
- Generalized, pluggable architecture.
- Configurable, automatic discovery of cluster nodes.
- Persistent, Keep-Alive connections.
- Load balancing (with pluggable selection strategy) across all available nodes.
- TypeScript support out of the box.

## Install
```
npm install @elastic/elasticsearch
```

### Compatibility

The minimum supported version of Node.js is `v8`.

The library is compatible with all Elasticsearch versions since 5.x, but you should use the same major version of the Elasticsearch instance that you are using.
```
# Elasticsearch 7.x
@elastic/elasticsearch@7

# Elasticsearch 6.x
@elastic/elasticsearch@6

# Elasticsearch 5.x
@elastic/elasticsearch@5
```

## Usage

You can find the full documentation in our [docs](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) website.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

// promise API
const result = await client.search({
  index: 'my-index',
  body: { foo: 'bar' }
})

// callback API
client.search({
  index: 'my-index',
  body: { foo: 'bar' }
}, (err, result) => {
  if (err) console.log(err)
})
```
The returned value of **every** API call is formed as follows:
```ts
{
  body: object | boolean
  statusCode: number
  headers: object
  warnings: [string]
  meta: object
}
```
### Client options

The client is designed to be easily configured as you see fit for your needs, following you can see all the possible options that you can use to configure it.

```ts
{
  // the Elasticsearch endpoint to use
  node: string | string[];
  // alias of above
  nodes: string | string[];
  // custom connection class
  Connection: typeof Connection;
  // custom connection pool class
  ConnectionPool: typeof ConnectionPool;
  // custom transport class
  Transport: typeof Transport;
  // custom serializer class
  Serializer: typeof Serializer;
  // max number of retries for each request
  maxRetries: number;
  // max request timeout for each request
  requestTimeout: number;
  // max ping timeout for each request
  pingTimeout: number;
  // perform a sniff operation every `n` milliseconds
  sniffInterval: number;
  // perform a sniff once the client is started
  sniffOnStart: boolean;
  // custom sniff endpoint, defaults `_nodes/_all/http`
  sniffEndpoint: string;
  // perform a sniff on connection fault
  sniffOnConnectionFault: boolean;
  // configurethe node resurrection strategy, default `ping`
  resurrectStrategy: 'ping' | 'optimistic' | 'none';
  // adds `accept-encoding` header to every request
  suggestCompression: boolean;
  // enable gzip request body compression
  compression: 'gzip';
  // ssl configuraton
  ssl: http.SecureContextOptions;
  // http agent options
  agent: http.AgentOptions;
  // filters which node not to use for a request
  nodeFilter: nodeFilterFn;
  // custom selection strategy, defaults `round-robin`
  nodeSelector: nodeSelectorFn | string;
  // function to generate the request id for every request
  generateRequestId: generateRequestIdFn;
  // name to identify the client instance in the events
  name: string;
}
```

### Request specific options
If needed you can pass request specific options in a second object:
```js
// promise API
const result = await client.search({
  index: 'my-index',
  body: { foo: 'bar' }
}, {
  ignore: [404],
  maxRetries: 3
})
```
The supported *request specific options* are:
```ts
{
  ignore: [number], // default `null`
  requestTimeout: number, // client default
  maxRetries: number, // default `5`
  asStream: boolean, // default `false`
  compression: string, // default `false`
  headers: object, // default `null`
  querystring: object // default `null`,
  context: object // default `null`,
  id: any // default incr. integer
}
```

## License

This software is licensed under the [Apache 2 license](./LICENSE).
