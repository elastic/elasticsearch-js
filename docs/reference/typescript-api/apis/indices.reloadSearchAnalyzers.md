# Client.indices.reloadSearchAnalyzers

Reload search analyzers. Reload an index's search analyzers and their resources. For data streams, the API reloads search analyzers and resources for the stream's backing indices. IMPORTANT: After reloading the search analyzers you should clear the request cache to make sure it doesn't contain responses derived from the previous versions of the analyzer. You can use the reload search analyzers API to pick up changes to synonym files used in the `synonym_graph` or `synonym` token filter of a search analyzer. To be eligible, the token filter must have an `updateable` flag of `true` and only be used in search analyzers. NOTE: This API does not perform a reload for each shard of an index. Instead, it performs a reload for each node containing index shards. As a result, the total shard count returned by the API can differ from the number of index shards. Because reloading affects every node with an index shard, it is important to update the synonym file on every data node in the cluster--including nodes that don't contain a shard replica--before using this API. This ensures the synonym file is updated everywhere in the cluster in case shards are relocated in the future.

## Method Signature

```typescript
client.indices.reloadSearchAnalyzers(this: That, params: T.IndicesReloadSearchAnalyzersRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesReloadSearchAnalyzersResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesReloadSearchAnalyzersRequest`](../types/IndicesReloadSearchAnalyzersRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesReloadSearchAnalyzersResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
