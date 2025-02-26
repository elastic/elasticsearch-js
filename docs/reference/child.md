---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/child.html
---

# Creating a child client [child]

There are some use cases where you may need multiple instances of the client. You can easily do that by calling `new Client()` as many times as you need, but you will lose all the benefits of using one single client, such as the long living connections and the connection pool handling. To avoid this problem, the client offers a `child` API, which returns a new client instance that shares the connection pool with the parent client.

::::{note}
The event emitter is shared between the parent and the child(ren). If you extend the parent client, the child client will have the same extensions, while if the child client adds an extension, the parent client will not be extended.
::::


You can pass to the `child` every client option you would pass to a normal client, but the connection pool specific options (`ssl`, `agent`, `pingTimeout`, `Connection`, and `resurrectStrategy`).

::::{warning}
If you call `close` in any of the parent/child clients, every client will be closed.
::::


```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const child = client.child({
  headers: { 'x-foo': 'bar' },
})

client.info().then(console.log, console.log)
child.info().then(console.log, console.log)
```
