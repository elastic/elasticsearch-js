# Client.search

Run a search. Get search hits that match the query defined in the request. You can provide search queries using the `q` query string parameter or the request body. If both are specified, only the query parameter is used. If the Elasticsearch security features are enabled, you must have the read index privilege for the target data stream, index, or alias. For cross-cluster search, refer to the documentation about configuring CCS privileges. To search a point in time (PIT) for an alias, you must have the `read` index privilege for the alias's data streams or indices. **Search slicing** When paging through a large number of documents, it can be helpful to split the search into multiple slices to consume them independently with the `slice` and `pit` properties. By default the splitting is done first on the shards, then locally on each shard. The local splitting partitions the shard into contiguous ranges based on Lucene document IDs. For instance if the number of shards is equal to 2 and you request 4 slices, the slices 0 and 2 are assigned to the first shard and the slices 1 and 3 are assigned to the second shard. IMPORTANT: The same point-in-time ID should be used for all slices. If different PIT IDs are used, slices can overlap and miss documents. This situation can occur because the splitting criterion is based on Lucene document IDs, which are not stable across changes to the index.

## Method Signature

```typescript
client.search(this: That, params?: T.SearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SearchRequest`](../types/SearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SearchResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
