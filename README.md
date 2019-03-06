<img align="right" width="auto" height="auto" src="https://www.elastic.co/static-res/images/elastic-logo-200.png">

# @elastic/elasticsearch

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://clients-ci.elastic.co/job/elastic+elasticsearch-js+master/badge/icon)](https://clients-ci.elastic.co/job/elastic+elasticsearch-js+master/)  [![NPM downloads](https://img.shields.io/npm/dm/@elastic/elasticsearch.svg?style=flat)](https://www.npmjs.com/package/@elastic/elasticsearch)

The official Node.js client for Elasticsearch.

## Features
- One-to-one mapping with REST API.
- Generalized, pluggable architecture.
- Configurable, automatic discovery of cluster nodes.
- Persistent, Keep-Alive connections.
- Load balancing (with pluggable selection strategy) across all available nodes.

## Install
```
npm install @elastic/elasticsearch
```
By default the latest version of the module will be installed, which is the same version of the current release of Elasticsearch.<br/>
If you need to work with older versions of Elasticsearch, you should install the same version of the client as well.<br/>
For example, if you are using Elasticsearch `v6.5.4`, you will need the client `v6`, and you can easily do that with `npm install @elastic/elasticsearch@6`.

## Usage
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
  headers: object // default `null`
}
```

## License

This software is licensed under the [Apache 2 license](./LICENSE).
