---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/search_examples.html
---

# Search [search_examples]

The `search` API allows you to execute a search query and get back search hits that match the query. The query can either be provided using a simple [query string as a parameter](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search), or using a [request body](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html).

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    document: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // here we are forcing an index refresh,
    // otherwise we will not get any result
    // in the consequent search
    refresh: true,
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // Let's search!
  const result = await client.search({
    index: 'game-of-thrones',
    query: {
      match: {
        quote: 'winter'
      }
    }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
```

