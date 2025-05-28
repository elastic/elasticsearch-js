# `Helpers` [class-Helpers]

## Constructor

```typescript
new Helpers(opts: [HelpersOptions](./HelpersOptions.md));
```

## Properties [class-properties-Helpers]

| Name | Type | Description |
| - | - | - |

## Methods [class-methods-Helpers]

| Name | Signature | Description |
| - | - | - |
| `bulk` | `bulk<TDocument = unknown>(options: [BulkHelperOptions](./BulkHelperOptions.md)<TDocument>, reqOptions?: [TransportRequestOptions](./TransportRequestOptions.md)): [BulkHelper](./BulkHelper.md)<TDocument>;` | Creates a bulk helper instance. Once you configure it, you can pick which operation to execute with the given dataset, index, create, update, and delete. |
| `esql` | `esql(params: [EsqlQueryRequest](./EsqlQueryRequest.md), reqOptions?: [TransportRequestOptions](./TransportRequestOptions.md)): [EsqlHelper](./EsqlHelper.md);` | Creates an ES|QL helper instance, to help transform the data returned by an ES|QL query into easy-to-use formats. |
| `msearch` | `msearch(options?: [MsearchHelperOptions](./MsearchHelperOptions.md), reqOptions?: [TransportRequestOptions](./TransportRequestOptions.md)): [MsearchHelper](./MsearchHelper.md);` | Creates a msearch helper instance. Once you configure it, you can use the provided `search` method to add new searches in the queue. |
| `scrollDocuments` | `scrollDocuments<TDocument = unknown>(params: [SearchRequest](./SearchRequest.md), options?: [ScrollSearchOptions](./ScrollSearchOptions.md)): [AsyncIterable](./AsyncIterable.md)<TDocument>;` | Runs a scroll search operation. This function returns an async iterator, allowing the user to use a for await loop to get all the documents of a given search. Each document is what you will find by running a scrollSearch and iterating on the hits array. This helper automatically adds `filter_path=hits.hits._source` to the querystring, as it will only need the documents source. |
| `scrollSearch` | `scrollSearch<TDocument = unknown, TAggregations = unknown>(params: [SearchRequest](./SearchRequest.md), options?: [ScrollSearchOptions](./ScrollSearchOptions.md)): [AsyncIterable](./AsyncIterable.md)<[ScrollSearchResponse](./ScrollSearchResponse.md)<TDocument, TAggregations>>;` | Runs a scroll search operation. This function returns an async iterator, allowing the user to use a for await loop to get all the results of a given search. Each result represents the entire body of a single scroll search request, if you just need to scroll the results, use scrollDocuments. This function handles automatically retries on 429 status code. |
| `search` | `search<TDocument = unknown>(params: [SearchRequest](./SearchRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<Array<TDocument & { _id: [Id](./Id.md); }>>;` | Runs a search operation. The only difference between client.search and this utility, is that we are only returning the hits to the user and not the full ES response. This helper automatically adds `filter_path=hits.hits._source` to the querystring, as it will only need the documents source. |
