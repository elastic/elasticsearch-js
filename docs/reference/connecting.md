---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html
---

# Connecting [client-connecting]

This page contains the information you need to connect and use the Client with {{es}}.

## Authentication [authentication]

This document contains code snippets to show you how to connect to various {{es}} providers.

### Elastic Cloud [auth-ec]

If you are using [Elastic Cloud](https://www.elastic.co/cloud), the client offers an easy way to connect to it via the `cloud` option. You must pass the Cloud ID that you can find in the cloud console, then your username and password inside the `auth` option.

::::{note}
When connecting to Elastic Cloud, the client will automatically enable both request and response compression by default, since it yields significant throughput improvements. Moreover, the client will also set the tls option `secureProtocol` to `TLSv1_2_method` unless specified otherwise. You can still override this option by configuring them.
::::

::::{important}
Do not enable sniffing when using Elastic Cloud, since the nodes are behind a load balancer, Elastic Cloud will take care of everything for you. Take a look [here](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how) to know more.
::::

```js
const { Client } = require('@elastic/elasticsearch')
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

## Connecting to an Elastic Cloud Serverless instance [connect-serverless]

The Node.js client is built to support connecting to [Elastic Cloud Serverless](https://www.elastic.co/guide/en/serverless/current/intro.html). By setting the `serverMode` option to `"serverless"`, several default options will be modified to better suit the serverless environment.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: {
    id: '<cloud-id>'
  },
  auth: {
    username: 'elastic',
    password: 'changeme'
  },
  serverMode: 'serverless'
})

```

## Connecting to a self-managed cluster [connect-self-managed-new]

By default {{es}} will start with security features like authentication and TLS enabled. To connect to the {{es}} cluster you’ll need to configure the Node.js {{es}} client to use HTTPS with the generated CA certificate in order to make requests successfully.

If you’re just getting started with {{es}} we recommend reading the documentation on [configuring](docs-content://deploy-manage/deploy/self-managed/configure-elasticsearch.md) and [starting {{es}}](docs-content://deploy-manage/maintenance/start-stop-services/start-stop-elasticsearch.md) to ensure your cluster is running as expected.

When you start {{es}} for the first time you’ll see a distinct block like the one below in the output from {{es}} (you may have to scroll up if it’s been a while):

```sh
-> Elasticsearch security features have been automatically configured!
-> Authentication is enabled and cluster connections are encrypted.

->  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
  lhQpLELkjkrawaBoaz0Q

->  HTTP CA certificate SHA-256 fingerprint:
  a52dd93511e8c6045e21f16654b77c9ee0f34aea26d9f40320b531c474676228
...
```

Depending on the circumstances there are two options for verifying the HTTPS connection, either verifying with the CA certificate itself or via the HTTP CA certificate fingerprint.

### TLS configuration [auth-tls]

The generated root CA certificate can be found in the `certs` directory in your {{es}} config location (`$ES_CONF_PATH/certs/http_ca.crt`). If you’re running {{es}} in Docker there is [additional documentation for retrieving the CA certificate](docs-content://deploy-manage/deploy/self-managed/install-elasticsearch-with-docker.md).

Without any additional configuration you can specify `https://` node urls, and the certificates used to sign these requests will be verified. To turn off certificate verification, you must specify an `tls` object in the top level config and set `rejectUnauthorized: false`. The default `tls` values are the same that Node.js’s [`tls.connect()`](https://nodejs.org/api/tls.md#tls_tls_connect_options_callback) uses.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme'
  },
  tls: {
    ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
})
```

### CA fingerprint [auth-ca-fingerprint]

You can configure the client to only trust certificates that are signed by a specific CA certificate (CA certificate pinning) by providing a `caFingerprint` option. This will verify that the fingerprint of the CA certificate that has signed the certificate of the server matches the supplied value. You must configure a SHA256 digest.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://example.com'
  auth: { ... },
  // the fingerprint (SHA256) of the CA certificate that is used to sign
  // the certificate that the Elasticsearch node presents for TLS.
  caFingerprint: '20:0D:CA:FA:76:...',
  tls: {
    // might be required if it's a self-signed certificate
    rejectUnauthorized: false
  }
})
```

The certificate fingerprint can be calculated using `openssl x509` with the certificate file:

```sh
openssl x509 -fingerprint -sha256 -noout -in /path/to/http_ca.crt
```

If you don’t have access to the generated CA file from {{es}} you can use the following script to output the root CA fingerprint of the {{es}} instance with `openssl s_client`:

```sh
# Replace the values of 'localhost' and '9200' to the
# corresponding host and port values for the cluster.
openssl s_client -connect localhost:9200 -servername localhost -showcerts </dev/null 2>/dev/null \
  | openssl x509 -fingerprint -sha256 -noout -in /dev/stdin
```

The output of `openssl x509` will look something like this:

```sh
SHA256 Fingerprint=A5:2D:D9:35:11:E8:C6:04:5E:21:F1:66:54:B7:7C:9E:E0:F3:4A:EA:26:D9:F4:03:20:B5:31:C4:74:67:62:28
```

## Connecting without security enabled [connect-no-security]

::::{warning}
Running {{es}} without security enabled is not recommended.
::::

If your cluster is configured with [security explicitly disabled](elasticsearch://reference/elasticsearch/configuration-reference/security-settings.md) then you can connect via HTTP:

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'http://example.com'
})
```

## Authentication strategies [auth-strategies]

Following you can find all the supported authentication strategies.

### ApiKey authentication [auth-apikey]

You can use the [ApiKey](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key) authentication by passing the `apiKey` parameter via the `auth` option. The `apiKey` parameter can be either a base64 encoded string or an object with the values that you can obtain from the [create api key endpoint](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key).

::::{note}
If you provide both basic authentication credentials and the ApiKey configuration, the ApiKey takes precedence.
::::

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    apiKey: 'base64EncodedKey'
  }
})
```

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    apiKey: {
      id: 'foo',
      api_key: 'bar'
    }
  }
})
```

### Bearer authentication [auth-bearer]

You can provide your credentials by passing the `bearer` token parameter via the `auth` option. Useful for [service account tokens](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-service-token). Be aware that it does not handle automatic token refresh.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    bearer: 'token'
  }
})
```

### Basic authentication [auth-basic]

You can provide your credentials by passing the `username` and `password` parameters via the `auth` option.

::::{note}
If you provide both basic authentication credentials and the Api Key configuration, the Api Key will take precedence.
::::

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme'
  }
})
```

Otherwise, you can provide your credentials in the node(s) URL.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://username:password@localhost:9200'
})
```

## Usage [client-usage]

Using the client is straightforward, it supports all the public APIs of {{es}}, and every method exposes the same signature.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

const result = await client.search({
  index: 'my-index',
  query: {
    match: { hello: 'world' }
  }
})
```

The returned value of every API call is the response body from {{es}}. If you need to access additonal metadata, such as the status code or headers, you must specify `meta: true` in the request options:

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

const result = await client.search({
  index: 'my-index',
  query: {
    match: { hello: 'world' }
  }
}, { meta: true })
```

In this case, the result will be:

```ts
{
  body: object | boolean
  statusCode: number
  headers: object
  warnings: string[],
  meta: object
}
```

::::{note}
The body is a boolean value when you use `HEAD` APIs.
::::

### Aborting a request [_aborting_a_request]

If needed, you can abort a running request by using the `AbortController` standard.

::::{warning}
If you abort a request, the request will fail with a `RequestAbortedError`.
::::

```js
const AbortController = require('node-abort-controller')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

const abortController = new AbortController()
setImmediate(() => abortController.abort())

const result = await client.search({
  index: 'my-index',
  query: {
    match: { hello: 'world' }
  }
}, { signal: abortController.signal })
```

### Request specific options [_request_specific_options]

If needed you can pass request specific options in a second object:

```js
const result = await client.search({
  index: 'my-index',
  body: {
    query: {
      match: { hello: 'world' }
    }
  }
}, {
  ignore: [404],
  maxRetries: 3
})
```

The supported request specific options are:

| Option | Description |
| --- | ----------- |
| `ignore` | `number[]` -  HTTP status codes which should not be considered errors for this request.<br>*Default:* `null` |
| `requestTimeout` | `number` or `string` - Max request timeout for the request in milliseconds. This overrides the client default, which is to not time out at all. See [{{es}} best practices for HTML clients](elasticsearch://reference/elasticsearch/configuration-reference/networking-settings.md#_http_client_configuration) for more info.<br>_Default:_ No timeout |connecting
| `retryOnTimeout` | `boolean` - Retry requests that have timed out.*Default:* `false` |
| `maxRetries` | `number` - Max number of retries for the request, it overrides the client default.<br>*Default:* `3` |
| `compression` | `string` or  `boolean` - Enables body compression for the request.<br>*Options:* `false`, `'gzip'`<br>*Default:* `false` |
| `asStream` | `boolean` - Instead of getting the parsed body back, you get the raw Node.js stream of data.<br>*Default:* `false` |
| `headers` | `object` - Custom headers for the request.<br>*Default:* `null` |
| `querystring` | `object` - Custom querystring for the request.<br>*Default:* `null` |
| `id` | `any` - Custom request ID. *(overrides the top level request id generator)*<br>*Default:* `null` |
| `context` | `any` - Custom object per request. *(you can use it to pass data to the clients events)*<br>*Default:* `null` |
| `opaqueId` | `string` - Set the `X-Opaque-Id` HTTP header. See [X-Opaque-Id HTTP header](elasticsearch://reference/elasticsearch/rest-apis/api-conventions.md#x-opaque-id)<br>*Default:* `null` |
| `maxResponseSize` | `number` - When configured, it verifies that the uncompressed response size is lower than the configured number, if it’s higher it will abort the request. It cannot be higher than buffer.constants.MAX_STRING_LENTGH<br>*Default:* `null` |
| `maxCompressedResponseSize` | `number` - When configured, it verifies that the compressed response size is lower than the configured number, if it’s higher it will abort the request. It cannot be higher than buffer.constants.MAX_LENTGH<br>*Default:* `null` |
| `signal` | `AbortSignal` - The AbortSignal instance to allow request abortion.<br>*Default:* `null` |
| `meta` | `boolean` - Rather than returning the body, return an object containing `body`, `statusCode`, `headers` and `meta` keys<br>*Default*: `false` |
| `redaction` | `object` - Options for redacting potentially sensitive data from error metadata. See [Redaction of potentially sensitive data](/reference/advanced-config.md#redaction). |
| `retryBackoff` | `(min: number, max: number, attempt: number) => number;` - A function that calculates how long to sleep, in seconds, before the next request retry<br>_Default:_ A built-in function that uses exponential backoff with jitter. |

## Using the Client in a Function-as-a-Service Environment [client-faas-env]

This section illustrates the best practices for leveraging the {{es}} client in a Function-as-a-Service (FaaS) environment. The most influential optimization is to initialize the client outside of the function, the global scope. This practice does not only improve performance but also enables background functionality as – for example – [sniffing](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how). The following examples provide a skeleton for the best practices.

### GCP Cloud Functions [_gcp_cloud_functions]

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  // client initialisation
})

exports.testFunction = async function (req, res) {
  // use the client
}
```

### AWS Lambda [_aws_lambda]

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  // client initialisation
})

exports.handler = async function (event, context) {
  // use the client
}
```

### Azure Functions [_azure_functions]

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  // client initialisation
})

module.exports = async function (context, req) {
  // use the client
}
```

Resources used to assess these recommendations:

* [GCP Cloud Functions: Tips & Tricks](https://cloud.google.com/functions/docs/bestpractices/tips#use_global_variables_to_reuse_objects_in_future_invocations)
* [Best practices for working with AWS Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
* [Azure Functions Python developer guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-python?tabs=azurecli-linux%2Capplication-level#global-variables)
* [AWS Lambda: Comparing the effect of global scope](https://docs.aws.amazon.com/lambda/latest/operatorguide/global-scope.html)

## Connecting through a proxy [client-connect-proxy]

Added in `v7.10.0`

If you need to pass through an http(s) proxy for connecting to {{es}}, the client out of the box offers a handy configuration for helping you with it. Under the hood, it uses the [`hpagent`](https://github.com/delvedor/hpagent) module.

::::{important}
In versions 8.0+ of the client, the default `Connection` type is set to `UndiciConnection`, which does not support proxy configurations. To use a proxy, you will need to use the `HttpConnection` class from `@elastic/transport` instead.
::::

```js
import { HttpConnection } from '@elastic/transport'

const client = new Client({
  node: 'http://localhost:9200',
  proxy: 'http://localhost:8080',
  Connection: HttpConnection,
})
```

Basic authentication is supported as well:

```js
const client = new Client({
  node: 'http://localhost:9200',
  proxy: 'http:user:pwd@//localhost:8080',
  Connection: HttpConnection,
})
```

If you are connecting through a non-http(s) proxy, such as a `socks5` or `pac`, you can use the `agent` option to configure it.

```js
const SocksProxyAgent = require('socks-proxy-agent')
const client = new Client({
  node: 'http://localhost:9200',
  agent () {
    return new SocksProxyAgent('socks://127.0.0.1:1080')
  },
  Connection: HttpConnection,
})
```

## Error handling [client-error-handling]

The client exposes a variety of error objects that you can use to enhance your error handling. You can find all the error objects inside the `errors` key in the client.

```js
const { errors } = require('@elastic/elasticsearch')
console.log(errors)
```

You can find the errors exported by the client in the table below.

| **Error** | **Description** | **Properties** |
| --- | --- | --- |
| `ElasticsearchClientError` | Every error inherits from this class, it is the basic error generated by the client. | * `name` - `string`<br>* `message` - `string`<br> |
| `TimeoutError` | Generated when a request exceeds the `requestTimeout` option. | * `name` - `string`<br>* `message` - `string`<br>* `meta` - `object`, contains all the information about the request<br> |
| `ConnectionError` | Generated when an error occurs during the request, it can be a connection error or a malformed stream of data. | * `name` - `string`<br>* `message` - `string`<br>* `meta` - `object`, contains all the information about the request<br> |
| `RequestAbortedError` | Generated if the user calls the `request.abort()` method. | * `name` - `string`<br>* `message` - `string`<br>* `meta` - `object`, contains all the information about the request<br> |
| `NoLivingConnectionsError` | Given the configuration, the ConnectionPool was not able to find a usable Connection for this request. | * `name` - `string`<br>* `message` - `string`<br>* `meta` - `object`, contains all the information about the request<br> |
| `SerializationError` | Generated if the serialization fails. | * `name` - `string`<br>* `message` - `string`<br>* `data` - `object`, the object to serialize<br> |
| `DeserializationError` | Generated if the deserialization fails. | * `name` - `string`<br>* `message` - `string`<br>* `data` - `string`, the string to deserialize<br> |
| `ConfigurationError` | Generated if there is a malformed configuration or parameter. | * `name` - `string`<br>* `message` - `string`<br> |
| `ResponseError` | Generated when in case of a `4xx` or `5xx` response. | * `name` - `string`<br>* `message` - `string`<br>* `meta` - `object`, contains all the information about the request<br>* `body` - `object`, the response body<br>* `statusCode` - `object`, the response headers<br>* `headers` - `object`, the response status code<br> |


## Keep-alive connections [keep-alive]

By default, the client uses persistent, keep-alive connections to reduce the overhead of creating a new HTTP connection for each {{es}} request. If you are using the default `UndiciConnection` connection class, it maintains a pool of 256 connections with a keep-alive of 10 minutes. If you are using the legacy `HttpConnection` connection class, it maintains a pool of 256 connections with a keep-alive of 1 minute.

If you need to disable keep-alive connections, you can override the HTTP agent with your preferred [HTTP agent options](https://nodejs.org/api/http.md#http_new_agent_options):

```js
const client = new Client({
  node: 'http://localhost:9200',
  // the function takes as parameter the option
  // object passed to the Connection constructor
  agent: (opts) => new CustomAgent()
})
```

Or you can disable the HTTP agent entirely:

```js
const client = new Client({
  node: 'http://localhost:9200',
  // Disable agent and keep-alive
  agent: false
})
```

## Closing a client’s connections [close-connections]

If you would like to close all open connections being managed by an instance of the client, use the `close()` function:

```js
const client = new Client({
  node: 'http://localhost:9200'
});
client.close();
```

## Automatic product check [product-check]

Since v7.14.0, the client performs a required product check before the first call. This pre-flight product check allows the client to establish the version of {{es}} that it is communicating with. The product check requires one additional HTTP request to be sent to the server as part of the request pipeline before the main API call is sent. In most cases, this will succeed during the very first API call that the client sends. Once the product check completes, no further product check HTTP requests are sent for subsequent API calls.
