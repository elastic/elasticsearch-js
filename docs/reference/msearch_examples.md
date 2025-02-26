---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/msearch_examples.html
---

# MSearch [msearch_examples]

The multi search API allows to execute several search requests within the same API.

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

  const result = await client.msearch({
    searches: [
      { index: 'game-of-thrones' },
      { query: { match: { character: 'Daenerys' } } },

      { index: 'game-of-thrones' },
      { query: { match: { character: 'Tyrion' } } }
    ]
  })

  console.log(result.responses)
}

run().catch(console.log)
```

