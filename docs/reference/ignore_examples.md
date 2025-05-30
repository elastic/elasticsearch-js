---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/ignore_examples.html
---

# Ignore [ignore_examples]

HTTP status codes which should not be considered errors for this request.

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
    body: {
      query: {
        match: {
          quote: 'fire'
        }
      }
    }
  }, {
    ignore: [404]
  })

  console.log(result) // ResponseError
}

run().catch(console.log)
```

