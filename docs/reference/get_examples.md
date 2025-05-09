---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/get_examples.html
---

# Get [get_examples]

The get API allows to get a typed JSON document from the index based on its id. The following example gets a JSON document from an index called `game-of-thrones`, under a type called `_doc`, with id valued `'1'`.

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

  const document = await client.get({
    index: 'game-of-thrones',
    id: '1'
  })

  console.log(document)
}

run().catch(console.log)
```

