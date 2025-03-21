---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/basic-config.html
---

# Basic configuration [basic-config]

This page shows you the possible basic configuration options that the clients offers.

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' },
  maxRetries: 5,
  sniffOnStart: true
})
```

|     |     |
| --- | --- |
| `node` or `nodes` | The Elasticsearch endpoint to use.<br> It can be a single string or an array of strings:<br><br><pre><code class="language-js hljs language-javascript"><br>node: 'http://localhost:9200'<br></code></pre><br><br>Or it can be an object (or an array of objects) that represents the node:<br><br><pre><code class="language-js hljs language-javascript"><br>node: {<br>  url: new URL('http://localhost:9200'),<br>  tls: 'tls options',<br>  agent: 'http agent options',<br>  id: 'custom node id',<br>  headers: { 'custom': 'headers' }<br>  roles: {<br>    master: true,<br>    data: true,<br>    ingest: true,<br>    ml: false<br>  }<br>}<br></code></pre><br> |
| `auth` | Your authentication data. You can use both basic authentication and [ApiKey](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key).<br> See [Authentication](/reference/connecting.md#authentication) for more details.<br> *Default:* `null`<br><br>Basic authentication:<br><br><pre><code class="language-js hljs language-javascript"><br>auth: {<br>  username: 'elastic',<br>  password: 'changeme'<br>}<br></code></pre><br><br>[ApiKey](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key) authentication:<br><br><pre><code class="language-js hljs language-javascript"><br>auth: {<br>  apiKey: 'base64EncodedKey'<br>}<br></code></pre><br><br>Bearer authentication, useful for [service account tokens](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-service-token). Be aware that it does not handle automatic token refresh:<br><br><pre><code class="language-js hljs language-javascript"><br>auth: {<br>  bearer: 'token'<br>}<br></code></pre><br> |
| `maxRetries` | `number` - Max number of retries for each request.<br>*Default:* `3` |
| `requestTimeout` | `number` - Max request timeout in milliseconds for each request.<br>*Default:* No value |
| `pingTimeout` | `number` - Max ping request timeout in milliseconds for each request.<br>*Default:* `3000` |
| `sniffInterval` | `number, boolean` - Perform a sniff operation every `n` milliseconds. Sniffing might not be the best solution for you, take a look [here](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how) to know more.<br>*Default:* `false` |
| `sniffOnStart` | `boolean` - Perform a sniff once the client is started. Sniffing might not be the best solution for you, take a look [here](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how) to know more.<br>*Default:* `false` |
| `sniffEndpoint` | `string` - Endpoint to ping during a sniff.<br>*Default:* `'_nodes/_all/http'` |
| `sniffOnConnectionFault` | `boolean` - Perform a sniff on connection fault. Sniffing might not be the best solution for you, take a look [here](https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how) to know more.<br>*Default:* `false` |
| `resurrectStrategy` | `string` - Configure the node resurrection strategy.<br>*Options:* `'ping'`, `'optimistic'`, `'none'`<br>*Default:* `'ping'` |
| `suggestCompression` | `boolean` - Adds `accept-encoding` header to every request.<br>*Default:* `false` |
| `compression` | `string, boolean` - Enables gzip request body compression.<br>*Options:* `'gzip'`, `false`<br>*Default:* `false` |
| `tls` | `http.SecureContextOptions` - tls [configuraton](https://nodejs.org/api/tls.md).<br>*Default:* `null` |
| `proxy` | `string, URL` - If you are using an http(s) proxy, you can put its url here. The client will automatically handle the connection to it.<br> *Default:* `null`<br><br><pre><code class="language-js hljs language-javascript"><br>const client = new Client({<br>  node: 'http://localhost:9200',<br>  proxy: 'http://localhost:8080'<br>})<br><br>const client = new Client({<br>  node: 'http://localhost:9200',<br>  proxy: 'http://user:pwd@localhost:8080'<br>})<br></code></pre><br> |
| `agent` | `http.AgentOptions, function` - http agent [options](https://nodejs.org/api/http.md#http_new_agent_options), or a function that returns an actual http agent instance. If you want to disable the http agent use entirely (and disable the `keep-alive` feature), set the agent to `false`.<br> *Default:* `null`<br><br><pre><code class="language-js hljs language-javascript"><br>const client = new Client({<br>  node: 'http://localhost:9200',<br>  agent: { agent: 'options' }<br>})<br><br>const client = new Client({<br>  node: 'http://localhost:9200',<br>  // the function takes as parameter the option<br>  // object passed to the Connection constructor<br>  agent: (opts) => new CustomAgent()<br>})<br><br>const client = new Client({<br>  node: 'http://localhost:9200',<br>  // Disable agent and keep-alive<br>  agent: false<br>})<br></code></pre><br> |
| `nodeFilter` | `function` - Takes a `Connection` and returns `true` if it can be sent a request, otherwise `false`.<br> *Default:*<br><br><pre><code class="language-js hljs language-javascript"><br>() => true<br></code></pre><br> |
| `nodeSelector` | `function` - custom selection strategy.<br> *Options:* `'round-robin'`, `'random'`, custom function<br> *Default:* `'round-robin'`<br> *Custom function example:*<br><br><pre><code class="language-js hljs language-javascript"><br>function nodeSelector (connections) {<br>  const index = calculateIndex()<br>  return connections[index]<br>}<br></code></pre><br> |
| `generateRequestId` | `function` - function to generate the request id for every request, it takes two parameters, the request parameters and options.<br> By default it generates an incremental integer for every request.<br> *Custom function example:*<br><br><pre><code class="language-js hljs language-javascript"><br>function generateRequestId (params, options) {<br>  // your id generation logic<br>  // must be syncronous<br>  return 'id'<br>}<br></code></pre><br> |
| `name` | `string, symbol` - The name to identify the client instance in the events.<br>*Default:* `elasticsearch-js` |
| `opaqueIdPrefix` | `string` - A string that will be use to prefix any `X-Opaque-Id` header.<br>See [`X-Opaque-Id` support](/reference/observability.md#_x_opaque_id_support) for more details.<br>_Default:* `null` |
| `headers` | `object` - A set of custom headers to send in every request.<br>*Default:* `{}` |
| `context` | `object` - A custom object that you can use for observability in your events.It will be merged with the API level context option.<br>*Default:* `null` |
| `enableMetaHeader` | `boolean` - If true, adds an header named `'x-elastic-client-meta'`, containing some minimal telemetry data,such as the client and platform version.<br>*Default:* `true` |
| `cloud` | `object` - Custom configuration for connecting to [Elastic Cloud](https://cloud.elastic.co). See [Authentication](/reference/connecting.md) for more details.<br> *Default:* `null`<br> *Cloud configuration example:*<br><br><pre><code class="language-js hljs language-javascript"><br>const client = new Client({<br>  cloud: {<br>    id: '<cloud-id>'<br>  },<br>  auth: {<br>    username: 'elastic',<br>    password: 'changeme'<br>  }<br>})<br></code></pre><br> |
| `disablePrototypePoisoningProtection` | `boolean`, `'proto'`, `'constructor'` - The client can protect you against prototype poisoning attacks. Read [this article](https://web.archive.org/web/20200319091159/https://hueniverse.com/square-brackets-are-the-enemy-ff5b9fd8a3e8?gi=184a27ee2a08) to learn more about this security concern. If needed, you can enable prototype poisoning protection entirely (`false`) or one of the two checks (`'proto'` or `'constructor'`). For performance reasons, it is disabled by default. Read the `secure-json-parse` [documentation](https://github.com/fastify/secure-json-parse) to learn more.<br>*Default:* `true` |
| `caFingerprint` | `string` - If configured, verify that the fingerprint of the CA certificate that has signed the certificate of the server matches the supplied fingerprint. Only accepts SHA256 digest fingerprints.<br>*Default:* `null` |
| `maxResponseSize` | `number` - When configured, it verifies that the uncompressed response size is lower than the configured number, if it’s higher it will abort the request. It cannot be higher than buffer.constants.MAX_STRING_LENGTH<br>*Default:* `null` |
| `maxCompressedResponseSize` | `number` - When configured, it verifies that the compressed response size is lower than the configured number, if it’s higher it will abort the request. It cannot be higher than buffer.constants.MAX_LENGTH<br>*Default:* `null` |
