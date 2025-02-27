---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/exists_examples.html
---

# Exists [exists_examples]

Check that the document `/game-of-thrones/1` exists.

::::{note}
Since this API uses the `HEAD` method, the body value will be boolean.
::::


```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  await client.index({
    index: 'game-of-thrones',
    id: '1',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  const exists = await client.exists({
    index: 'game-of-thrones',
    id: 1
  })

  console.log(exists) // true
}

run().catch(console.log)
```

