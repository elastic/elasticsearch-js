---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/transport_request_examples.html
---

# transport.request [transport_request_examples]

It can happen that you need to communicate with {{es}} by using an API that is not supported by the client, to mitigate this issue you can directly call `client.transport.request`, which is the internal utility that the client uses to communicate with {{es}} when you use an API method.

::::{note}
When using the `transport.request` method you must provide all the parameters needed to perform an HTTP call, such as `method`, `path`, `querystring`, and `body`.
::::


::::{tip}
If you find yourself use this method too often, take in consideration the use of `client.extend`, which will make your code look cleaner and easier to maintain.
::::


```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  const bulkResponse = await client.bulk({
    refresh: true,
    operations: [
      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      },

      { index: { _index: 'game-of-thrones' } },
      {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    ]
  })

  if (bulkResponse.errors) {
    console.log(bulkResponse)
    process.exit(1)
  }

  const response = await client.transport.request({
    method: 'POST',
    path: '/game-of-thrones/_search',
    body: {
      query: {
        match: {
          quote: 'winter'
        }
      }
    },
    querystring: {}
  })

  console.log(response)
}

run().catch(console.log)
```

