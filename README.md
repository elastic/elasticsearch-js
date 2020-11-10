<img align="right" width="auto" height="auto" src="https://www.elastic.co/static-res/images/elastic-logo-200.png">

# Elasticsearch Node.js client

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://clients-ci.elastic.co/buildStatus/icon?job=elastic%2Belasticsearch-js%2Bmaster)](https://clients-ci.elastic.co/view/Javascript/job/elastic+elasticsearch-js+master/)  [![codecov](https://codecov.io/gh/elastic/elasticsearch-js/branch/master/graph/badge.svg)](https://codecov.io/gh/elastic/elasticsearch-js)  [![NPM downloads](https://img.shields.io/npm/dm/@elastic/elasticsearch.svg?style=flat)](https://www.npmjs.com/package/@elastic/elasticsearch)

The official Node.js client for Elasticsearch.

---

**Note:** In the past months we have worked on the new Elasticsearch Node.js client and you can use it by following the instructions below. If you're going to use the legacy one or report an issue, however, please check out [elastic/elasticsearch-js-legacy](https://github.com/elastic/elasticsearch-js-legacy).

---

## Features
- One-to-one mapping with REST API.
- Generalized, pluggable architecture.
- Configurable, automatic discovery of cluster nodes.
- Persistent, Keep-Alive connections.
- Load balancing across all available nodes.
- Child client support.
- TypeScript support out of the box.

## Install
```
npm install @elastic/elasticsearch
```

### Node.js support

NOTE: The minimum supported version of Node.js is `v8`.

The client versioning follows the Elastc Stack versioning, this means that
major, minor, and patch releases are done following a precise schedule that
often does not coincide with the [Node.js release](https://nodejs.org/en/about/releases/) times.

To avoid support insecure and unsupported versions of Node.js, the
client **will drop the support of EOL versions of Node.js between minor releases**.
Typically, as soon as a Node.js version goes into EOL, the client will continue
to support that version for at least another minor release. If you are using the client
with a version of Node.js that will be unsupported soon, you will see a warning
in your logs (the client will start logging the warning with two minors in advance).

Unless you are **always** using a supported version of Node.js, 
we recommend defining the client dependency in your
`package.json` with the `~` instead of `^`. In this way, you will lock the
dependency on the minor release and not the major. (for example, `~7.10.0` instead
of `^7.10.0`).

| Node.js Version | Node.js EOL date | End of support         |
| --------------- |------------------| ---------------------- |
| `8.x`           | `December 2019`  | `7.11` (early 2021)    |       
| `10.x`          | `Apri 2021`      | `7.12` (mid 2021)      |        

### Compatibility

The library is compatible with all Elasticsearch versions since 5.x, and you should use the same major version of the Elasticsearch instance that you are using.

| Elasticsearch Version | Client Version |
| --------------------- |----------------|
| `master`              | `master`       |
| `7.x`                 | `7.x`          |
| `6.x`                 | `6.x`          |
| `5.x`                 | `5.x`          |

To install a specific major of the client, run the following command:
```
npm install @elastic/elasticsearch@<major>
```

#### Browser

WARNING: There is no official support for the browser environment. It exposes your Elasticsearch instance to everyone, which could lead to security issues.
We recommend that you write a lightweight proxy that uses this client instead.

## Documentation

- [Introduction](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html)
- [Changelog](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/changelog-client.html)
- [Usage](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-usage.html)
- [Client configuration](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html)
- [API reference](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html)
- [Breaking changes coming from the old client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/breaking-changes.html)
- [Authentication](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/auth-reference.html)
- [Observability](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/observability.html)
- [Creating a child client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/child-client.html)
- [Extend the client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/extend-client.html)
- [Client helpers](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-helpers.html)
- [Typescript support](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html)
- [Testing](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-testing.html)
- [Examples](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/examples.html)

## Quick start

First of all, require the client and initialize it:
```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
```

You can use both the callback-style API and the promise-style API, both behave the same way.
```js
// promise API
const result = await client.search({
  index: 'my-index',
  body: {
    query: {
      match: { hello: 'world' }
    }
  }
})

// callback API
client.search({
  index: 'my-index',
  body: {
    query: {
      match: { hello: 'world' }
    }
  }
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

Let's see a complete example!
```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)
```

## Install multiple versions
If you are using multiple versions of Elasticsearch, you need to use multiple versions of the client. In the past, install multiple versions of the same package was not possible, but with `npm v6.9`, you can do that via aliasing.

The command you must run to install different version of the client is:
```sh
npm install <alias>@npm:@elastic/elasticsearch@<version>
```
So for example if you need to install `7.x` and `6.x`, you will run
```sh
npm install es6@npm:@elastic/elasticsearch@6
npm install es7@npm:@elastic/elasticsearch@7
```
And your `package.json` will look like the following:
```json
"dependencies": {
  "es6": "npm:@elastic/elasticsearch@^6.7.0",
  "es7": "npm:@elastic/elasticsearch@^7.0.0"
}
```
You will require the packages from your code by using the alias you have defined.
```js
const { Client: Client6 } = require('es6')
const { Client: Client7 } = require('es7')

const client6 = new Client6({ node: 'http://localhost:9200' })
const client7 = new Client7({ node: 'http://localhost:9201' })

client6.info(console.log)
client7.info(console.log)
```

Finally, if you want to install the client for the next version of Elasticsearch *(the one that lives in Elasticsearch’s master branch)*, you can use the following command:
```sh
npm install esmaster@github:elastic/elasticsearch-js
```

## License

This software is licensed under the [Apache 2 license](./LICENSE).
