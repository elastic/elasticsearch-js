# Client.helpers

The `Client.helpers` namespace provides utility methods for common operations.

## search

Runs a search operation. The only difference between client.search and this utility,
is that we are only returning the hits to the user and not the full ES response.
This helper automatically adds `filter_path=hits.hits._source` to the querystring,
as it will only need the documents source.

### Signature

```typescript
client.helpers.search(params: T.SearchRequest, options: TransportRequestOptions): Promise<Array<TDocument & { _id: Id }>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `params` | `T.SearchRequest` | - The Elasticsearch's search parameters. |
| `options` | `TransportRequestOptions` | - The client optional configuration for this request. |

## scrollSearch

Runs a scroll search operation. This function returns an async iterator, allowing
the user to use a for await loop to get all the results of a given search.
```js
for await (const result of client.helpers.scrollSearch({ params })) {
  console.log(result)
}
```
Each result represents the entire body of a single scroll search request,
if you just need to scroll the results, use scrollDocuments.
This function handles automatically retries on 429 status code.

### Signature

```typescript
client.helpers.scrollSearch(params: T.SearchRequest, options: ScrollSearchOptions): AsyncIterable<ScrollSearchResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `params` | `T.SearchRequest` | - The Elasticsearch's search parameters. |
| `options` | `ScrollSearchOptions` | - The client optional configuration for this request. |

## scrollDocuments

Runs a scroll search operation. This function returns an async iterator, allowing
the user to use a for await loop to get all the documents of a given search.
```js
for await (const document of client.helpers.scrollSearch({ params })) {
  console.log(document)
}
```
Each document is what you will find by running a scrollSearch and iterating on the hits array.
This helper automatically adds `filter_path=hits.hits._source` to the querystring,
as it will only need the documents source.

### Signature

```typescript
client.helpers.scrollDocuments(params: T.SearchRequest, options: ScrollSearchOptions): AsyncIterable<TDocument>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `params` | `T.SearchRequest` | - The Elasticsearch's search parameters. |
| `options` | `ScrollSearchOptions` | - The client optional configuration for this request. |

## msearch

Creates a msearch helper instance. Once you configure it, you can use the provided
`search` method to add new searches in the queue.

### Signature

```typescript
client.helpers.msearch(options: MsearchHelperOptions, reqOptions: TransportRequestOptions): MsearchHelper
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `MsearchHelperOptions` | - The configuration of the msearch operations. |
| `reqOptions` | `TransportRequestOptions` | - The client optional configuration for this request. |

## bulk

Creates a bulk helper instance. Once you configure it, you can pick which operation
to execute with the given dataset, index, create, update, and delete.

### Signature

```typescript
client.helpers.bulk(options: BulkHelperOptions<TDocument>, reqOptions: TransportRequestOptions): BulkHelper<TDocument>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `BulkHelperOptions<TDocument>` | - The configuration of the bulk operation. |
| `reqOptions` | `TransportRequestOptions` | - The client optional configuration for this request. |

## esql

Creates an ES|QL helper instance, to help transform the data returned by an ES|QL query into easy-to-use formats.

### Signature

```typescript
client.helpers.esql(params: T.EsqlQueryRequest, reqOptions: TransportRequestOptions): EsqlHelper
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `params` | `T.EsqlQueryRequest` | - Request parameters sent to esql.query() |
| `reqOptions` | `TransportRequestOptions` | - |

## See Also

- [Client](./client.md)
