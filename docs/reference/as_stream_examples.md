---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/as_stream_examples.html
---

# asStream [as_stream_examples]

Instead of getting the parsed body back, you will get the raw Node.js stream of data.

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
      // operation to perform
      { index: { _index: 'game-of-thrones' } },
      // the document to index
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

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    query: {
      match: {
        quote: 'winter'
      }
    }
  }, {
    asStream: true
  })

  let payload = ''
  result.setEncoding('utf8')
  for await (const chunk of result) {
    payload += chunk
  }
  console.log(JSON.parse(payload))
}

run().catch(console.log)
```

::::{tip}
This can be useful if you need to pipe the {{es}}'s response to a proxy, or send it directly to another source.
::::


```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const fastify = require('fastify')()

fastify.post('/search/:index', async (req, reply) => {
  const { body, statusCode, headers } = await client.search({
    index: req.params.index,
    ...req.body
  }, {
    asStream: true,
    meta: true
  })

  reply.code(statusCode).headers(headers)
  return body
})

fastify.listen(3000)
```

