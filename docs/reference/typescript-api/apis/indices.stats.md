# Client.indices.stats

Get index statistics. For data streams, the API retrieves statistics for the stream's backing indices. By default, the returned statistics are index-level with `primaries` and `total` aggregations. `primaries` are the values for only the primary shards. `total` are the accumulated values for both primary and replica shards. To get shard-level statistics, set the `level` parameter to `shards`. NOTE: When moving to another node, the shard-level statistics for a shard are cleared. Although the shard is no longer part of the node, that node retains any node-level statistics to which the shard contributed.

## Method Signature

```typescript
client.indices.stats(this: That, params?: T.IndicesStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesStatsRequest`](../types/IndicesStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
