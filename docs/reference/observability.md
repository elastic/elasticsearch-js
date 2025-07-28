---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/observability.html
---

# Observability [observability]

To observe and measure Elasticsearch client usage, several client features are provided.

First, as of 8.15.0, the client provides native support for OpenTelemetry, which allows you to send client usage data to any endpoint that supports OpenTelemetry without having to make any changes to your JavaScript codebase.

Also, rather than providing a default logger, the client offers an event emitter interface to hook into internal events, such as `request` and `response`, allowing you to log the events you care about, or otherwise react to client usage however you might need.

Correlating events can be hard, especially if your applications have a large codebase with many events happening at the same time. To help you with this, the client provides a correlation ID system, and other features.

All of these observability features are documented below.

## OpenTelemetry [_opentelemetry]

The client supports OpenTelemetry’s [zero-code instrumentation](https://opentelemetry.io/docs/zero-code/js/) to enable tracking each client request as an [OpenTelemetry span](https://opentelemetry.io/docs/concepts/signals/traces/#spans). These spans follow all of the [semantic OpenTelemetry conventions for Elasticsearch](https://opentelemetry.io/docs/specs/semconv/database/elasticsearch/) except for `db.query.text`.

To start sending Elasticsearch trace data to your OpenTelemetry endpoint, follow [OpenTelemetry’s zero-code instrumentation guide](https://opentelemetry.io/docs/zero-code/js/), or the following steps:

1. Install `@opentelemetry/api` and `@opentelemetry/auto-instrumentations-node` as Node.js dependencies
2. Export the following environment variables with the appropriate values:

    * `OTEL_EXPORTER_OTLP_ENDPOINT`
    * `OTEL_EXPORTER_OTLP_HEADERS`
    * `OTEL_RESOURCE_ATTRIBUTES`
    * `OTEL_SERVICE_NAME`

3. `require` the Node.js auto-instrumentation library at startup:

```
node --require '@opentelemetry/auto-instrumentations-node/register' index.js
```

### Disabling OpenTelemetry collection [disable-otel]

As of `@elastic/transport` version 9.1.0&mdash;or 8.10.0 when using `@elastic/elasticsearch` 8.x&mdash;OpenTelemetry tracing can be disabled in multiple ways.

To entirely disable OpenTelemetry collection, you can provide a custom `Transport` at client instantiation time that sets `openTelemetry.enabled` to `false`:

```typescript
import { Transport } from '@elastic/transport'

class MyTransport extends Transport {
  async request(params, options = {}): Promise<any> {
    options.openTelemetry = { enabled: false }
    return super.request(params, options)
  }
}

const client = new Client({
  node: '...',
  auth: { ... },
  Transport: MyTransport
})
```

Alternatively, you can also export an environment variable `OTEL_ELASTICSEARCH_ENABLED=false` to achieve the same effect.

If you would not like OpenTelemetry to be disabled entirely, but would like the client to suppress tracing, you can use the option `openTelemetry.suppressInternalInstrumentation = false` instead.

If you would like to keep either option enabled by default, but want to disable them for a single API call, you can pass `Transport` options as a second argument to any API function call:

```typescript
const response = await client.search({ ... }, {
  openTelemetry: { enabled: false }
})
```

## Events [_events]

The client is an event emitter. This means that you can listen for its events to add additional logic to your code, without needing to change the client’s internals or how you use the client. You can find the events' names by accessing the `events` key of the client:

```js
const { events } = require('@elastic/elasticsearch')
console.log(events)
```

The event emitter functionality can be useful if you want to log every request, response or error that is created by the client:

```js
const logger = require('my-logger')()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

client.diagnostic.on('response', (err, result) => {
  if (err) {
    logger.error(err)
  } else {
    logger.info(result)
  }
})
```

### Event types

The client emits the following events:

#### `serialization`

Emitted before starting serialization and compression. If you want to measure this phase duration, you should measure the time elapsed between this event and `request`.

```js
client.diagnostic.on("serialization", (err, result) => {
  console.log(err, result)
})
```

#### `request`

Emitted before sending the actual request to {{es}} _(emitted multiple times in case of retries)_.

```js
client.diagnostic.on("request", (err, result) => {
  console.log(err, result)
})
```

#### `deserialization`

Emitted before starting deserialization and decompression. If you want to measure this phase duration, you should measure the time elapsed between this event and `response`.

This event might not be emitted in certain situations:

* When `asStream` is set to true, the response is returned in its raw stream form before deserialization occurs
* When a response is terminated early due to content length being too large
* When a response is terminated early by an `AbortController`

```js
client.diagnostic.on("deserialization", (err, result) => {
  console.log(err, result)
})
```

#### `response`

Emitted once {{es}} response has been received and parsed.

```js
client.diagnostic.on("response", (err, result) => {
  console.log(err, result)
})
```

#### `sniff`

Emitted when the client ends a sniffing request.

```js
client.diagnostic.on("sniff", (err, result) => {
  console.log(err, result)
})
```

#### `resurrect`

Emitted if the client is able to resurrect a dead node.

```js
client.diagnostic.on("resurrect", (err, result) => {
  console.log(err, result)
})
```

The values of `result` in `serialization`, `request`, `deserialization`, `response` and `sniff` are:

```ts
body: any;
statusCode: number | null;
headers: anyObject | null;
warnings: string[] | null;
meta: {
  context: any;
  name: string;
  request: {
    params: TransportRequestParams;
    options: TransportRequestOptions;
    id: any;
  };
  connection: Connection;
  attempts: number;
  aborted: boolean;
  sniff?: {
    hosts: any[];
    reason: string;
  };
};
```

While the `result` value in `resurrect` is:

```ts
strategy: string;
isAlive: boolean;
connection: Connection;
name: string;
request: {
  id: any;
};
```

### Events order [_events_order]

The event order is described in the following graph, in some edge cases, the order is not guaranteed. You can find in [`test/acceptance/events-order.test.js`](https://github.com/elastic/elasticsearch-js/blob/main/test/acceptance/events-order.test.js) how the order changes based on the situation.

```
serialization
  │
  │ (serialization and compression happens between those two events)
  │
  └─▶ request
        │
        │ (actual time spent over the wire)
        │
        └─▶ deserialization
              │
              │ (deserialization and decompression happens between those two events)
              │
              └─▶ response
```

## Correlation ID [_correlation_id]

Correlating events can be hard, especially if there are many events at the same time. The client offers you an automatic (and configurable) system to help you handle this problem.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

client.diagnostic.on('request', (err, result) => {
  const { id } = result.meta.request
  if (err) {
    console.log({ error: err, reqId: id })
  }
})

client.diagnostic.on('response', (err, result) => {
  const { id } = result.meta.request
  if (err) {
    console.log({ error: err, reqId: id })
  }
})

client.search({
  index: 'my-index',
  query: { match_all: {} }
}).then(console.log, console.log)
```

By default the ID is an incremental integer, but you can configure it with the `generateRequestId` option:

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  // it takes two parameters, the request parameters and options
  generateRequestId: function (params, options) {
    // your id generation logic
    // must be synchronous
    return 'id'
  }
})
```

You can also specify a custom ID per request:

```js
client.search({
  index: 'my-index',
  query: { match_all: {} }
}, {
  id: 'custom-id'
}).then(console.log, console.log)
```

## Context object [_context_object]

Sometimes, you might need to make some custom data available in your events, you can do that via the `context` option of a request:

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

client.diagnostic.on('request', (err, result) => {
  const { id } = result.meta.request
  const { context } = result.meta
  if (err) {
    console.log({ error: err, reqId: id, context })
  }
})

client.diagnostic.on('response', (err, result) => {
  const { id } = result.meta.request
  const { winter } = result.meta.context
  if (err) {
    console.log({ error: err, reqId: id, winter })
  }
})

client.search({
  index: 'my-index',
  query: { match_all: {} }
}, {
  context: { winter: 'is coming' }
}).then(console.log, console.log)
```

The context object can also be configured as a global option in the client configuration. If you provide both, the two context objects will be shallow merged, and the API level object will take precedence.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  context: { winter: 'is coming' }
})

client.diagnostic.on('request', (err, result) => {
  const { id } = result.meta.request
  const { context } = result.meta
  if (err) {
    console.log({ error: err, reqId: id, context })
  }
})

client.diagnostic.on('response', (err, result) => {
  const { id } = result.meta.request
  const { winter } = result.meta.context
  if (err) {
    console.log({ error: err, reqId: id, winter })
  }
})

client.search({
  index: 'my-index',
  query: { match_all: {} }
}, {
  context: { winter: 'has come' }
}).then(console.log, console.log)
```

## Client name [_client_name]

If you are using multiple instances of the client or if you are using multiple child clients _(which is the recommended way to have multiple instances of the client)_, you might need to recognize which client you are using. The `name` options help you in this regard.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  name: 'parent-client' // default to 'elasticsearch-js'
})

const child = client.child({
  name: 'child-client'
})

console.log(client.name, child.name)

client.diagnostic.on('request', (err, result) => {
  const { id } = result.meta.request
  const { name } = result.meta
  if (err) {
    console.log({ error: err, reqId: id, name })
  }
})

client.diagnostic.on('response', (err, result) => {
  const { id } = result.meta.request
  const { name } = result.meta
  if (err) {
    console.log({ error: err, reqId: id, name })
  }
})

client.search({
  index: 'my-index',
  query: { match_all: {} }
}).then(console.log, console.log)

child.search({
  index: 'my-index',
  query: { match_all: {} }
}).then(console.log, console.log)
```

## X-Opaque-Id support [_x_opaque_id_support]

To improve observability, the client offers an easy way to configure the `X-Opaque-Id` header. If you set the `X-Opaque-Id` in a specific request, this allows you to discover this identifier in the [deprecation logs](docs-content://deploy-manage/monitor/logging-configuration/update-elasticsearch-logging-levels.md#deprecation-logging), helps you with [identifying search slow log origin](elasticsearch://reference/elasticsearch/index-settings/slow-log.md) as well as [identifying running tasks](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-tasks).

The `X-Opaque-Id` should be configured in each request, for doing that you can use the `opaqueId` option, as you can see in the following example. The resulting header will be `{ 'X-Opaque-Id': 'my-search' }`.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

client.search({
  index: 'my-index',
  body: { foo: 'bar' }
}, {
  opaqueId: 'my-search'
}).then(console.log, console.log)
```

Sometimes it may be useful to prefix all the `X-Opaque-Id` headers with a specific string, in case you need to identify a specific client or server. For doing this, the client offers a top-level configuration option: `opaqueIdPrefix`. In the following example, the resulting header will be `{ 'X-Opaque-Id': 'proxy-client::my-search' }`.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  opaqueIdPrefix: 'proxy-client::'
})

client.search({
  index: 'my-index',
  body: { foo: 'bar' }
}, {
  opaqueId: 'my-search'
}).then(console.log, console.log)
```
