---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/basic-config.html
---

# Basic configuration [basic-config]

This page explains the basic configuration options for the JavaScript client.

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  maxRetries: 5,
  sniffOnStart: true
})
```

### `node` or `nodes`

The {{es}} endpoint to use. It can be a single string or an array of strings:

```js
node: 'http://localhost:9200'
```

```js
nodes: ['http://localhost:9200', 'http://localhost:9201']
```

Or it can be an object (or an array of objects) that represents the node:

```js
node: {
  url: new URL('http://localhost:9200'),
  tls: 'tls options',
  agent: 'http agent options',
  id: 'custom node id',
  headers: { 'custom': 'headers' },
  roles: {
    master: true,
    data: true,
    ingest: true,
    ml: false
  }
}
```

---

### `auth`

Default: `null`

Your authentication data. You can use both basic authentication and [ApiKey](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key).
 See [Authentication](/reference/connecting.md#authentication) for more details.

Basic authentication:

```js
auth: {
  username: 'elastic',
  password: 'changeme'
}
```

[ApiKey](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key) authentication:

```js
auth: {
  apiKey: 'base64EncodedKey'
}
```

Bearer authentication, useful for [service account tokens](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-service-token). Be aware that it does not handle automatic token refresh:

```js
auth: {
  bearer: 'token'
}
```

---

### `maxRetries`

Type: `number`<br>
Default: `3`

Max number of retries for each request.

---

### `requestTimeout`

Type: `number`<br>
Default: `No value`

Max request timeout in milliseconds for each request.

---

### `pingTimeout`

Type: `number`<br>
Default: `3000`

Max ping request timeout in milliseconds for each request.

---

### `sniffInterval`

Type: `number, boolean`<br>
Default: `false`

Perform a sniff operation every `n` milliseconds.

:::{tip}
Sniffing might not be the best solution. Before using the various `sniff` options, review this [blog post](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how).
:::

---

### `sniffOnStart`

Type: `boolean`<br>
Default: `false`

Perform a sniff once the client is started. Be sure to review the sniffing best practices [blog post](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how).

---

### `sniffEndpoint`

Type: `string`<br>
Default: `'_nodes/_all/http'`

Endpoint to ping during a sniff. Be sure to review the sniffing best practices [blog post](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how).

---

### `sniffOnConnectionFault`

Type: `boolean`<br>
Default: `false`

Perform a sniff on connection fault. Be sure to review the sniffing best practices [blog post](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how).

---

### `resurrectStrategy`

Type: `string`<br>
Default: `'ping'`

Configure the node resurrection strategy.<br>
Options: `'ping'`, `'optimistic'`, `'none'`

---

### `suggestCompression`

Type: `boolean`<br>
Default: `false`

Adds an `accept-encoding` header to every request.

---

### `compression`

Type: `string, boolean`<br>
Default: `false`

Enables gzip request body compression.<br>
Options: `'gzip'`, `false`

---

### `tls`

Type: `http.SecureContextOptions`<br>
Default: `null`

The [tls configuraton](https://nodejs.org/api/tls.html).

---

### `proxy`

Type: `string, URL`<br>
Default: `null`

If you are using an http(s) proxy, you can put its url here. The client will automatically handle the connection to it.

```js
const client = new Client({
  node: 'http://localhost:9200',
  proxy: 'http://localhost:8080'
})

const client = new Client({
  node: 'http://localhost:9200',
  proxy: 'http://user:pwd@localhost:8080'
})
```

---

### `agent`

Type: `http.AgentOptions, function`<br>
Default: `null`

http agent [options](https://nodejs.org/api/http.html#http_new_agent_options), or a function that returns an actual http agent instance. If you want to disable the http agent use entirely (and disable the `keep-alive` feature), set the agent to `false`.

```js
const client = new Client({
  node: 'http://localhost:9200',
  agent: { agent: 'options' }
})

const client = new Client({
  node: 'http://localhost:9200',
  // the function takes as parameter the option
  // object passed to the Connection constructor
  agent: (opts) => new CustomAgent()
})

const client = new Client({
  node: 'http://localhost:9200',
  // Disable agent and keep-alive
  agent: false
})
```

---

### `nodeFilter`

Type: `function`

Filter that indicates whether a node should be used for a request. Default function definition:

```js
function defaultNodeFilter (node) {
  // avoid master only nodes
  if (node.roles.master === true &&
      node.roles.data === false &&
      node.roles.ingest === false) {
    return false
  }
  return true
}
```

---

### `nodeSelector`

Type: `function`<br>
Default: `'round-robin'`

Custom selection strategy.<br>
Options: `'round-robin'`, `'random'`, custom function

Custom function example:

```js
function nodeSelector (connections) {
  const index = calculateIndex()
  return connections[index]
}
```

---

### `generateRequestId`

Type: `function`<br>

function to generate the request id for every request, it takes two parameters, the request parameters and options. By default, it generates an incremental integer for every request.

Custom function example:

```js
function generateRequestId (params, options) {
  // your id generation logic
  // must be syncronous
  return 'id'
}
```

---

### `name`

Type: `string, symbol`<br>
Default: `elasticsearch-js`

The name to identify the client instance in the events.

---

### `opaqueIdPrefix`

Type: `string`<br>
Default: `null`

A string that will be use to prefix any `X-Opaque-Id` header.
See [`X-Opaque-Id` support](/reference/observability.md#_x_opaque_id_support) for more details.

---

### `headers`

Type: `object`<br>
Default: `{}`

A set of custom headers to send in every request.

---

### `context`

Type: `object`<br>
Default: `null`

A custom object that you can use for observability in your events. It will be merged with the API level context option.

---

### `enableMetaHeader`

Type: `boolean`<br>
Default: `true`

If true, adds an header named `'x-elastic-client-meta'`, containing some minimal telemetry data, such as the client and platform version.

---

### `cloud`

Type: `object`<br>
Default: `null`

Custom configuration for connecting to [Elastic Cloud](https://cloud.elastic.co). See [Authentication](/reference/connecting.md) for more details.

Cloud configuration example:

```js
const client = new Client({
  cloud: {
    id: '<cloud-id>'
  },
  auth: {
    username: 'elastic',
    password: 'changeme'
  }
})
```

---

### `disablePrototypePoisoningProtection`

Default: `true`

`boolean`, `'proto'`, `'constructor'` - The client can protect you against prototype poisoning attacks. For more information, refer to [Square Brackets are the Enemy](https://web.archive.org/web/20200319091159/https://hueniverse.com/square-brackets-are-the-enemy-ff5b9fd8a3e8?gi=184a27ee2a08). If needed, you can enable prototype poisoning protection entirely (`false`) or one of the two checks (`'proto'` or `'constructor'`). For performance reasons, it is disabled by default. To learn more, refer to the [`secure-json-parse` documentation](https://github.com/fastify/secure-json-parse).

---

### `caFingerprint`

Type: `string`<br>
Default: `null`

If configured, verify that the fingerprint of the CA certificate that has signed the certificate of the server matches the supplied fingerprint. Only accepts SHA256 digest fingerprints.

---

### `maxResponseSize`

Type: `number`<br>
Default: `null`

When configured, `maxResponseSize` verifies that the uncompressed response size is lower than the configured number. If it’s higher, the request will be canceled. The `maxResponseSize` cannot be higher than the value of `buffer.constants.MAX_STRING_LENGTH`.

---

### `maxCompressedResponseSize`

Type: `number`<br>
Default: `null`

When configured, `maxCompressedResponseSize` verifies that the compressed response size is lower than the configured number. If it’s higher, the request will be canceled. The `maxCompressedResponseSize` cannot be higher than the value of `buffer.constants.MAX_STRING_LENGTH`.

---

### `redaction`

Type: `object`<br>
Default: A configuration that will replace known sources of sensitive data in `Error` metadata

Options for how to redact potentially sensitive data from metadata attached to `Error` objects

::::{note}
[Read about redaction](/reference/advanced-config.md#redaction) for more details
::::

---

### `serverMode`

Type: `string`<br>
Default: `"stack"`

Setting to `"stack"` sets defaults assuming a traditional (non-serverless) {{es}} instance. Setting to `"serverless"` sets defaults to work more seamlessly with [Elastic Cloud Serverless](https://www.elastic.co/guide/en/serverless/current/intro.html), like enabling compression and disabling features that assume the possibility of multiple {{es}} nodes.
