---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/advanced-config.html
---

# Advanced configuration [advanced-config]

If you need to customize the client behavior heavily, you are in the right place! The client enables you to customize the following internals:

* `ConnectionPool` class
* `Connection` class
* `Serializer` class

::::{note}
For information about the `Transport` class, refer to [Transport](/reference/transport.md).
::::



## `ConnectionPool` [_connectionpool]

This class is responsible for keeping in memory all the {{es}} connections that you are using. There is a single `Connection` for every node. The connection pool handles the resurrection strategies and the updates of the pool.

```js
const { Client, ConnectionPool } = require('@elastic/elasticsearch')

class MyConnectionPool extends ConnectionPool {
  markAlive (connection) {
    // your code
    super.markAlive(connection)
  }
}

const client = new Client({
  ConnectionPool: MyConnectionPool,
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
```


## `Connection` [_connection]

This class represents a single node, it holds every information we have on the node, such as roles, id, URL, custom headers and so on. The actual HTTP request is performed here, this means that if you want to swap the default HTTP client ([Undici `Pool`](https://undici.nodejs.org/#/docs/api/Pool.md)), you should override the `request` method of this class.

```js
const { Client, BaseConnection } = require('@elastic/elasticsearch')

class MyConnection extends BaseConnection {
  request (params, callback) {
    // your code
  }
}

const client = new Client({
  Connection: MyConnection,
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
```

`@elastic/transport` provides two `Connection` implementations:

- `UndiciConnection`: manages HTTP connections using [Undici](https://undici.nodejs.org/), Node.js's high-performance HTTP client implementation; this is the default value of `Connection` and is recommended unless you have a use case that is not yet supported by Undici or `UndiciConnection`
- `HttpConnection`: manages HTTP connections using [the `http` package](https://nodejs.org/api/http.html) from Node.js's standard library

## `Serializer` [_serializer]

This class is responsible for the serialization of every request, it offers the following methods:

* `serialize(object: any): string;` serializes request objects.
* `deserialize(json: string): any;` deserializes response strings.
* `ndserialize(array: any[]): string;` serializes bulk request objects.
* `qserialize(object: any): string;` serializes request query parameters.

```js
const { Client, Serializer } = require('@elastic/elasticsearch')

class MySerializer extends Serializer {
  serialize (object) {
    // your code
  }
}

const client = new Client({
  Serializer: MySerializer,
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
```


## Redaction of potentially sensitive data [redaction]

When the client raises an `Error` that originated at the HTTP layer, like a `ConnectionError` or `TimeoutError`, a `meta` object is often attached to the error object that includes metadata useful for debugging, like request and response information. Because this can include potentially sensitive data, like authentication secrets in an `Authorization` header, the client takes measures to redact common sources of sensitive data when this metadata is attached and serialized.

If your configuration requires extra headers or other configurations that may include sensitive data, you may want to adjust these settings to account for that.

By default, the `redaction` option is set to `{ type: 'replace' }`, which recursively searches for sensitive key names, case insensitive, and replaces their values with the string `[redacted]`.

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
})

try {
  await client.indices.create({ index: 'my_index' })
} catch (err) {
  console.log(err.meta.meta.request.options.headers.authorization) // prints "[redacted]"
}
```

If you would like to redact additional properties, you can include additional key names to search and replace:

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  headers: { 'X-My-Secret-Password': 'shhh it's a secret!' },
  redaction: {
    type: "replace",
    additionalKeys: ["x-my-secret-password"]
  }
})

try {
  await client.indices.create({ index: 'my_index' })
} catch (err) {
  console.log(err.meta.meta.request.options.headers['X-My-Secret-Password']) // prints "[redacted]"
}
```

Alternatively, if you know you’re not going to use the metadata at all, setting the redaction type to `remove` will remove all optional sources of potentially sensitive data entirely, or replacing them with `null` for required properties.

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  redaction: { type: "remove" }
})

try {
  await client.indices.create({ index: 'my_index' })
} catch (err) {
  console.log(err.meta.meta.request.options.headers) // undefined
}
```

Finally, if you prefer to turn off redaction altogether, perhaps while debugging on a local developer environment, you can set the redaction type to `off`. This will revert the client to pre-8.11.0 behavior, where basic redaction is only performed during common serialization methods like `console.log` and `JSON.stringify`.

::::{warning}
Setting `redaction.type` to `off` is not recommended in production environments.
::::


```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  redaction: { type: "off" }
})

try {
  await client.indices.create({ index: 'my_index' })
} catch (err) {
  console.log(err.meta.meta.request.options.headers.authorization) // the actual header value will be logged
}
```


## Migrate to v8 [_migrate_to_v8]

The Node.js client can be configured to emit an HTTP header `Accept: application/vnd.elasticsearch+json; compatible-with=7` which signals to {{es}} that the client is requesting `7.x` version of request and response bodies. This allows for upgrading from 7.x to 8.x version of {{es}} without upgrading everything at once. {{es}} should be upgraded first after the compatibility header is configured and clients should be upgraded second. To enable to setting, configure the environment variable `ELASTIC_CLIENT_APIVERSIONING` to `true`.

