---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/bulk_examples.html
---

# Bulk [bulk_examples]

With the [`bulk` API](/reference/api-reference.md#_bulk), you can perform multiple index/delete operations in a single API call. The `bulk` API significantly increases indexing speed.

::::{note}
You can also use the [bulk helper](/reference/client-helpers.md#bulk-helper).
::::


```js
'use strict'

require('array.prototype.flatmap').shim()
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  await client.indices.create({
    index: 'tweets',
    operations: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          text: { type: 'text' },
          user: { type: 'keyword' },
          time: { type: 'date' }
        }
      }
    }
  }, { ignore: [400] })

  const dataset = [{
    id: 1,
    text: 'If I fall, don\'t bring me back.',
    user: 'jon',
    time: new Date()
  }, {
    id: 2,
    text: 'Winter is coming',
    user: 'ned',
    time: new Date()
  }, {
    id: 3,
    text: 'A Lannister always pays his debts.',
    user: 'tyrion',
    time: new Date()
  }, {
    id: 4,
    text: 'I am the blood of the dragon.',
    user: 'daenerys',
    time: new Date()
  }, {
    id: 5, // change this value to a string to see the bulk response with errors
    text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
    user: 'arya',
    time: new Date()
  }]

  const operations = dataset.flatMap(doc => [{ index: { _index: 'tweets' } }, doc])

  const bulkResponse = await client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: operations[i * 2],
          document: operations[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const count = await client.count({ index: 'tweets' })
  console.log(count)
}

run().catch(console.log)
```

## Bulk ingestion with base64-encoded vectors [bulk_vectors]

When ingesting dense vectors, you can encode float arrays as base64 strings for more efficient transfer. The client's `serializer` provides `encodeFloat32Vector` and `decodeFloat32Vector` methods that encode IEEE-754 float32 values in big-endian byte order.

```js
'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})

async function run () {
  await client.indices.create({
    index: 'my-vectors',
    mappings: {
      properties: {
        title: { type: 'text' },
        embedding: { type: 'dense_vector', dims: 3 }
      }
    }
  }, { ignore: [400] })

  const documents = [
    { title: 'Document 1', embedding: [0.1, 0.2, 0.3] },
    { title: 'Document 2', embedding: [0.4, 0.5, 0.6] },
    { title: 'Document 3', embedding: [0.7, 0.8, 0.9] }
  ]

  const operations = documents.flatMap(doc => [
    { index: { _index: 'my-vectors' } },
    {
      title: doc.title,
      embedding: client.serializer.encodeFloat32Vector(doc.embedding)
    }
  ])

  const bulkResponse = await client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    console.log('Bulk ingestion had errors')
  } else {
    console.log(`Indexed ${documents.length} documents with encoded vectors`)
  }
}

run().catch(console.log)
```

