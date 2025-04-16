---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/getting-started-js.html
  - https://www.elastic.co/guide/en/serverless/current/elasticsearch-nodejs-client-getting-started.html
---

# Getting started [getting-started-js]

This page guides you through the installation process of the Node.js client, shows you how to instantiate the client, and how to perform basic Elasticsearch operations with it.


### Requirements [_requirements]

* [Node.js](https://nodejs.org/) version 14.x or newer
* [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), usually bundled with Node.js


### Installation [_installation]

To install the latest version of the client, run the following command:

```shell
npm install @elastic/elasticsearch
```

Refer to the [*Installation*](/reference/installation.md) page to learn more.


### Connecting [_connecting]

You can connect to the Elastic Cloud using an API key and the Elasticsearch endpoint.

```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://...', // Elasticsearch endpoint
  auth: {
    apiKey: { // API key ID and secret
      id: 'foo',
      api_key: 'bar',
    }
  }
})
```

Your Elasticsearch endpoint can be found on the **My deployment** page of your deployment:

![Finding Elasticsearch endpoint](images/es-endpoint.jpg)

You can generate an API key on the **Management** page under Security.

![Create API key](images/create-api-key.png)

For other connection options, refer to the [*Connecting*](/reference/connecting.md) section.


### Operations [_operations]

Time to use Elasticsearch! This section walks you through the basic, and most important, operations of Elasticsearch.


#### Creating an index [_creating_an_index]

This is how you create the `my_index` index:

```js
await client.indices.create({ index: 'my_index' })
```


#### Indexing documents [_indexing_documents]

This is a simple way of indexing a document:

```js
await client.index({
  index: 'my_index',
  id: 'my_document_id',
  document: {
    foo: 'foo',
    bar: 'bar',
  },
})
```


#### Getting documents [_getting_documents]

You can get documents by using the following code:

```js
await client.get({
  index: 'my_index',
  id: 'my_document_id',
})
```


#### Searching documents [_searching_documents]

This is how you can create a single match query with the client:

```js
await client.search({
  query: {
    match: {
      foo: 'foo'
    }
  }
})
```


#### Updating documents [_updating_documents]

This is how you can update a document, for example to add a new field:

```js
await client.update({
  index: 'my_index',
  id: 'my_document_id',
  doc: {
    foo: 'bar',
    new_field: 'new value'
  }
})
```


#### Deleting documents [_deleting_documents]

```js
await client.delete({
  index: 'my_index',
  id: 'my_document_id',
})
```


#### Deleting an index [_deleting_an_index]

```js
await client.indices.delete({ index: 'my_index' })
```


## Further reading [_further_reading]

* Use [*Client helpers*](/reference/client-helpers.md) for a more comfortable experience with the APIs.
* For an elaborate example of how to ingest data into Elastic Cloud, refer to [this page](docs-content://manage-data/ingest/ingesting-data-from-applications/ingest-data-with-nodejs-on-elasticsearch-service.md).
