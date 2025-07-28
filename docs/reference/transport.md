---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/transport.html
---

# Transport [transport]

This class is responsible for performing the request to {{es}} and handling errors, it also handles sniffing.

```js
const { Client } = require('@elastic/elasticsearch')
const { Transport } = require('@elastic/transport')

class MyTransport extends Transport {
  request (params, options) {
    // your code
  }
}

const client = new Client({
    Transport: MyTransport
})
```

Sometimes you need to inject a small snippet of your code and then continue to use the usual client code. In such cases, call `super.method`:

```js
class MyTransport extends Transport {
  request (params, options) {
    // your code
    return super.request(params, options)
  }
}
```

## Supported content types [_supported_content_types]

Depending on the `content-type` of the response, the transport will return the body as different types:

| Content-Type | JavaScript type |
| --- | --- |
| `application/json` | `object` |
| `text/plain` | `string` |
| `application/vnd.elasticsearch+json` | `object` |
| `application/vnd.mapbox-vector-tile` | `Buffer` |
| `application/vnd.apache.arrow.stream` | `Buffer` |
| `application/vnd.elasticsearch+arrow+stream` | `Buffer` |
| `application/smile` | `Buffer` |
| `application/vnd.elasticsearch+smile` | `Buffer` |
| `application/cbor` | `Buffer` |
| `application/vnd.elasticsearch+cbor` | `Buffer` |


