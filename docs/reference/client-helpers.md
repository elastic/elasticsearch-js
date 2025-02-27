---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-helpers.html
---

# Client helpers [client-helpers]

The client comes with an handy collection of helpers to give you a more comfortable experience with some APIs.

::::{warning}
The client helpers are experimental, and the API may change in the next minor releases. The helpers will not work in any Node.js version lower than 10.
::::



## Bulk helper [bulk-helper]

Added in `v7.7.0`

Running bulk requests can be complex due to the shape of the API, this helper aims to provide a nicer developer experience around the Bulk API.


### Usage [_usage_3]

```js
const { createReadStream } = require('fs')
const split = require('split2')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const result = await client.helpers.bulk({
  datasource: createReadStream('./dataset.ndjson').pipe(split()),
  onDocument (doc) {
    return {
      index: { _index: 'my-index' }
    }
  }
})

console.log(result)
// {
//   total: number,
//   failed: number,
//   retry: number,
//   successful: number,
//   time: number,
//   bytes: number,
//   aborted: boolean
// }
```

To create a new instance of the Bulk helper, access it as shown in the example above, the configuration options are:

|     |     |
| --- | --- |
| `datasource` | An array, async generator or a readable stream with the data you need to index/create/update/delete. It can be an array of strings or objects, but also a stream of json strings or JavaScript objects.<br> If it is a stream, we recommend to use the [`split2`](https://www.npmjs.com/package/split2) package, that splits the stream on new lines delimiters.<br> This parameter is mandatory.<br><br>```js<br>const { createReadStream } = require('fs')<br>const split = require('split2')<br>const b = client.helpers.bulk({<br>  // if you just use split(), the data will be used as array of strings<br>  datasource: createReadStream('./dataset.ndjson').pipe(split())<br>  // if you need to manipulate the data, you can pass JSON.parse to split<br>  datasource: createReadStream('./dataset.ndjson').pipe(split(JSON.parse))<br>})<br>```<br> |
| `onDocument` | A function that is called for each document of the datasource. Inside this function you can manipulate the document and you must return the operation you want to execute with the document. Look at the [Bulk API documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk) to see the supported operations.<br> This parameter is mandatory.<br><br>```js<br>const b = client.helpers.bulk({<br>  onDocument (doc) {<br>    return {<br>      index: { _index: 'my-index' }<br>    }<br>  }<br>})<br>```<br> |
| `onDrop` | A function that is called for everytime a document can’t be indexed and it has reached the maximum amount of retries.<br><br>```js<br>const b = client.helpers.bulk({<br>  onDrop (doc) {<br>    console.log(doc)<br>  }<br>})<br>```<br> |
| `onSuccess` | A function that is called for each successful operation in the bulk request, which includes the result from Elasticsearch along with the original document that was sent, or `null` for delete operations.<br><br>```js<br>const b = client.helpers.bulk({<br>  onSuccess ({ result, document }) {<br>    console.log(`SUCCESS: Document ${result.index._id} indexed to ${result.index._index}`)<br>  }<br>})<br>```<br> |
| `flushBytes` | The size of the bulk body in bytes to reach before to send it. Default of 5MB.<br> *Default:* `5000000`<br><br>```js<br>const b = client.helpers.bulk({<br>  flushBytes: 1000000<br>})<br>```<br> |
| `flushInterval` | How much time (in milliseconds) the helper waits before flushing the body from the last document read.<br> *Default:* `30000`<br><br>```js<br>const b = client.helpers.bulk({<br>  flushInterval: 30000<br>})<br>```<br> |
| `concurrency` | How many request is executed at the same time.<br> *Default:* `5`<br><br>```js<br>const b = client.helpers.bulk({<br>  concurrency: 10<br>})<br>```<br> |
| `retries` | How many times a document is retried before to call the `onDrop` callback.<br> *Default:* Client max retries.<br><br>```js<br>const b = client.helpers.bulk({<br>  retries: 3<br>})<br>```<br> |
| `wait` | How much time to wait before retries in milliseconds.<br> *Default:* 5000.<br><br>```js<br>const b = client.helpers.bulk({<br>  wait: 3000<br>})<br>```<br> |
| `refreshOnCompletion` | If `true`, at the end of the bulk operation it runs a refresh on all indices or on the specified indices.<br> *Default:* false.<br><br>```js<br>const b = client.helpers.bulk({<br>  refreshOnCompletion: true<br>  // or<br>  refreshOnCompletion: 'index-name'<br>})<br>```<br> |


### Supported operations [_supported_operations]


#### Index [_index_2]

```js
client.helpers.bulk({
  datasource: myDatasource,
  onDocument (doc) {
    return {
      index: { _index: 'my-index' }
    }
  }
})
```


#### Create [_create_4]

```js
client.helpers.bulk({
  datasource: myDatasource,
  onDocument (doc) {
    return {
      create: { _index: 'my-index', _id: doc.id }
    }
  }
})
```


#### Update [_update_3]

```js
client.helpers.bulk({
  datasource: myDatasource,
  onDocument (doc) {
    // Note that the update operation requires you to return
    // an array, where the first element is the action, while
    // the second are the document option
    return [
      { update: { _index: 'my-index', _id: doc.id } },
      { doc_as_upsert: true }
    ]
  }
})
```


#### Delete [_delete_10]

```js
client.helpers.bulk({
  datasource: myDatasource,
  onDocument (doc) {
    return {
      delete: { _index: 'my-index', _id: doc.id }
    }
  }
})
```


### Abort a bulk operation [_abort_a_bulk_operation]

If needed, you can abort a bulk operation at any time. The bulk helper returns a [thenable](https://promisesaplus.com/), which has an `abort` method.

::::{note}
The abort method stops the execution of the bulk operation, but if you are using a concurrency higher than one, the operations that are already running will not be stopped.
::::


```js
const { createReadStream } = require('fs')
const split = require('split2')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const b = client.helpers.bulk({
  datasource: createReadStream('./dataset.ndjson').pipe(split()),
  onDocument (doc) {
    return {
      index: { _index: 'my-index' }
    }
  },
  onDrop (doc) {
    b.abort()
  }
})

console.log(await b)
```


### Passing custom options to the Bulk API [_passing_custom_options_to_the_bulk_api]

You can pass any option supported by the link: [Bulk API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk) to the helper, and the helper uses those options in conjunction with the Bulk API call.

```js
const result = await client.helpers.bulk({
  datasource: [...],
  onDocument (doc) {
    return {
      index: { _index: 'my-index' }
    }
  },
  pipeline: 'my-pipeline'
})
```


### Usage with an async generator [_usage_with_an_async_generator]

```js
const { Client } = require('@elastic/elasticsearch')

async function * generator () {
  const dataset = [
    { user: 'jon', age: 23 },
    { user: 'arya', age: 18 },
    { user: 'tyrion', age: 39 }
  ]
  for (const doc of dataset) {
    yield doc
  }
}

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const result = await client.helpers.bulk({
  datasource: generator(),
  onDocument (doc) {
    return {
      index: { _index: 'my-index' }
    }
  }
})

console.log(result)
```


### Modifying a document before operation [_modifying_a_document_before_operation]

Added in `v8.8.2`

If you need to modify documents in your datasource before it is sent to Elasticsearch, you can return an array in the `onDocument` function rather than an operation object. The first item in the array must be the operation object, and the second item must be the document or partial document object as you’d like it to be sent to Elasticsearch.

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const result = await client.helpers.bulk({
  datasource: [...],
  onDocument (doc) {
    return [
      { index: { _index: 'my-index' } },
      { ...doc, favorite_color: 'mauve' },
    ]
  }
})

console.log(result)
```


## Multi search helper [multi-search-helper]

Added in `v7.8.0`

If you send search request at a high rate, this helper might be useful for you. It uses the multi search API under the hood to batch the requests and improve the overall performances of your application. The `result` exposes a `documents` property as well, which allows you to access directly the hits sources.


### Usage [_usage_4]

```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const m = client.helpers.msearch()

m.search(
    { index: 'stackoverflow' },
    { query: { match: { title: 'javascript' } } }
  )
  .then(result => console.log(result.body)) // or result.documents
  .catch(err => console.error(err))
```

To create a new instance of the multi search (msearch) helper, you should access it as shown in the example above, the configuration options are:

|     |     |
| --- | --- |
| `operations` | How many search operations should be sent in a single msearch request.<br> *Default:* `5`<br><br>```js<br>const m = client.helpers.msearch({<br>  operations: 10<br>})<br>```<br> |
| `flushInterval` | How much time (in milliseconds) the helper waits before flushing the operations from the last operation read.<br> *Default:* `500`<br><br>```js<br>const m = client.helpers.msearch({<br>  flushInterval: 500<br>})<br>```<br> |
| `concurrency` | How many request is executed at the same time.<br> *Default:* `5`<br><br>```js<br>const m = client.helpers.msearch({<br>  concurrency: 10<br>})<br>```<br> |
| `retries` | How many times an operation is retried before to resolve the request. An operation is retried only in case of a 429 error.<br> *Default:* Client max retries.<br><br>```js<br>const m = client.helpers.msearch({<br>  retries: 3<br>})<br>```<br> |
| `wait` | How much time to wait before retries in milliseconds.<br> *Default:* 5000.<br><br>```js<br>const m = client.helpers.msearch({<br>  wait: 3000<br>})<br>```<br> |


### Stopping the msearch helper [_stopping_the_msearch_helper]

If needed, you can stop an msearch processor at any time. The msearch helper returns a [thenable](https://promisesaplus.com/), which has an `stop` method.

If you are creating multiple msearch helpers instances and using them for a limitied period of time, remember to always use the `stop` method once you have finished using them, otherwise your application will start leaking memory.

The `stop` method accepts an optional error, that will be dispatched every subsequent search request.

::::{note}
The stop method stops the execution of the msearch processor, but if you are using a concurrency higher than one, the operations that are already running will not be stopped.
::::


```js
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: { id: '<cloud-id>' },
  auth: { apiKey: 'base64EncodedKey' }
})
const m = client.helpers.msearch()

m.search(
    { index: 'stackoverflow' },
    { query: { match: { title: 'javascript' } } }
  )
  .then(result => console.log(result.body))
  .catch(err => console.error(err))

m.search(
    { index: 'stackoverflow' },
    { query: { match: { title: 'ruby' } } }
  )
  .then(result => console.log(result.body))
  .catch(err => console.error(err))

setImmediate(() => m.stop())
```


## Search helper [search-helper]

Added in `v7.7.0`

A simple wrapper around the search API. Instead of returning the entire `result` object it returns only the search documents source. For improving the performances, this helper automatically adds `filter_path=hits.hits._source` to the query string.

```js
const documents = await client.helpers.search({
  index: 'stackoverflow',
  query: {
    match: {
      title: 'javascript'
    }
  }
})

for (const doc of documents) {
  console.log(doc)
}
```


## Scroll search helper [scroll-search-helper]

Added in `v7.7.0`

This helpers offers a simple and intuitive way to use the scroll search API. Once called, it returns an [async iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) which can be used in conjuction with a for-await…​of. It handles automatically the `429` error and uses the `maxRetries` option of the client.

```js
const scrollSearch = client.helpers.scrollSearch({
  index: 'stackoverflow',
  query: {
    match: {
      title: 'javascript'
    }
  }
})

for await (const result of scrollSearch) {
  console.log(result)
}
```


### Clear a scroll search [_clear_a_scroll_search]

If needed, you can clear a scroll search by calling `result.clear()`:

```js
for await (const result of scrollSearch) {
  if (condition) {
    await result.clear()
  }
}
```


### Quickly getting the documents [_quickly_getting_the_documents]

If you only need the documents from the result of a scroll search, you can access them via `result.documents`:

```js
for await (const result of scrollSearch) {
  console.log(result.documents)
}
```


## Scroll documents helper [scroll-documents-helper]

Added in `v7.7.0`

It works in the same way as the scroll search helper, but it returns only the documents instead. Note, every loop cycle returns a single document, and you can’t use the `clear` method. For improving the performances, this helper automatically adds `filter_path=hits.hits._source` to the query string.

```js
const scrollSearch = client.helpers.scrollDocuments({
  index: 'stackoverflow',
  query: {
    match: {
      title: 'javascript'
    }
  }
})

for await (const doc of scrollSearch) {
  console.log(doc)
}
```


## ES|QL helper [esql-helper]

ES|QL queries can return their results in [several formats](docs-content://explore-analyze/query-filter/languages/esql-rest.md#esql-rest-format). The default JSON format returned by ES|QL queries contains arrays of values for each row, with column names and types returned separately:


### Usage [_usage_5]


#### `toRecords` [_torecords]

Added in `v8.14.0`

The default JSON format returned by ES|QL queries contains arrays of values for each row, with column names and types returned separately:

```json
{
  "columns": [
    { "name": "@timestamp", "type": "date" },
    { "name": "client_ip", "type": "ip" },
    { "name": "event_duration", "type": "long" },
    { "name": "message", "type": "keyword" }
  ],
  "values": [
    [
      "2023-10-23T12:15:03.360Z",
      "172.21.2.162",
      3450233,
      "Connected to 10.1.0.3"
    ],
    [
      "2023-10-23T12:27:28.948Z",
      "172.21.2.113",
      2764889,
      "Connected to 10.1.0.2"
    ]
  ]
}
```

In many cases, it’s preferable to operate on an array of objects, one object per row, rather than an array of arrays. The ES|QL `toRecords` helper converts row data into objects.

```js
await client.helpers
  .esql({ query: 'FROM sample_data | LIMIT 2' })
  .toRecords()
// =>
// {
//   "columns": [
//     { "name": "@timestamp", "type": "date" },
//     { "name": "client_ip", "type": "ip" },
//     { "name": "event_duration", "type": "long" },
//     { "name": "message", "type": "keyword" }
//   ],
//   "records": [
//     {
//       "@timestamp": "2023-10-23T12:15:03.360Z",
//       "client_ip": "172.21.2.162",
//       "event_duration": 3450233,
//       "message": "Connected to 10.1.0.3"
//     },
//     {
//       "@timestamp": "2023-10-23T12:27:28.948Z",
//       "client_ip": "172.21.2.113",
//       "event_duration": 2764889,
//       "message": "Connected to 10.1.0.2"
//     },
//   ]
// }
```

In TypeScript, you can declare the type that `toRecords` returns:

```ts
type EventLog = {
  '@timestamp': string,
  client_ip: string,
  event_duration: number,
  message: string,
}

const result = await client.helpers
  .esql({ query: 'FROM sample_data | LIMIT 2' })
  .toRecords<EventLog>()
```


#### `toArrowReader` [_toarrowreader]

Added in `v8.16.0`

ES|QL can return results in multiple binary formats, including [Apache Arrow](https://arrow.apache.org/)'s streaming format. Because it is a very efficient format to read, it can be valuable for performing high-performance in-memory analytics. And, because the response is streamed as batches of records, it can be used to produce aggregations and other calculations on larger-than-memory data sets.

`toArrowReader` returns a [`RecordBatchStreamReader`](https://arrow.apache.org/docs/js/classes/Arrow_dom.RecordBatchReader.md).

```ts
const reader = await client.helpers
  .esql({ query: 'FROM sample_data' })
  .toArrowReader()

// print each record as JSON
for (const recordBatch of reader) {
  for (const record of recordBatch) {
    console.log(record.toJSON())
  }
}
```


#### `toArrowTable` [_toarrowtable]

Added in `v8.16.0`

If you would like to pull the entire data set in Arrow format but without streaming, you can use the `toArrowTable` helper to get a [Table](https://arrow.apache.org/docs/js/classes/Arrow_dom.Table.md) back instead.

```ts
const table = await client.helpers
  .esql({ query: 'FROM sample_data' })
  .toArrowTable()

console.log(table.toArray())
```
