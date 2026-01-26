# Client.search_shards

Get the search shards. Get the indices and shards that a search request would be run against. This information can be useful for working out issues or planning optimizations with routing and shard preferences. When filtered aliases are used, the filter is returned as part of the `indices` section. If the Elasticsearch security features are enabled, you must have the `view_index_metadata` or `manage` index privilege for the target data stream, index, or alias.

## Method Signature

```typescript
client.search_shards(this: That, params?: T.SearchShardsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchShardsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SearchShardsRequest`](../types/SearchShardsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SearchShardsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
