---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/update_examples.html
---

# Update [update_examples]

The update API allows updates of a specific document using the given script. In the following example, we will index a document that also tracks how many times a character has said the given quote, and then we will update the `times` field.

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
      quote: 'Winter is coming.',
      times: 0
    }
  })

  await client.update({
    index: 'game-of-thrones',
    id: '1',
    script: {
      lang: 'painless',
      source: 'ctx._source.times++'
      // you can also use parameters
      // source: 'ctx._source.times += params.count',
      // params: { count: 1 }
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

With the update API, you can also run a partial update of a document.

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
      quote: 'Winter is coming.',
      isAlive: true
    }
  })

  await client.update({
    index: 'game-of-thrones',
    id: '1',
    doc: {
      isAlive: false
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

