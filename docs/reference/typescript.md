---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html
---

# TypeScript support [typescript]

The client offers a first-class support for TypeScript, shipping a complete set of type definitions of Elasticsearch’s API surface.

The types are not 100% complete yet. Some APIs are missing (the newest ones, e.g. EQL), and others may contain some errors, but we are continuously pushing fixes & improvements. Contribute type fixes and improvements to [elasticsearch-specification github repository](https://github.com/elastic/elasticsearch-specification).

::::{note}
The client is developed against the [latest](https://www.npmjs.com/package/typescript?activeTab=versions) version of TypeScript. Furthermore, unless you have set `skipLibCheck` to `true`, you should configure `esModuleInterop` to `true`.
::::

## Example [_example]

```ts
import { Client } from '@elastic/elasticsearch'

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

interface Document {
  character: string
  quote: string
}

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
    document: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const result= await client.search<Document>({
    index: 'game-of-thrones',
    query: {
      match: { quote: 'winter' }
    }
  })

  console.log(result.hits.hits)
}

run().catch(console.log)
```

## Request & Response types [_request_response_types]

You can import the full TypeScript requests & responses definitions as it follows:

```ts
import { estypes } from '@elastic/elasticsearch'
```
