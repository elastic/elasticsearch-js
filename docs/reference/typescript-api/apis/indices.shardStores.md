# Client.indices.shardStores

Get index shard stores. Get store information about replica shards in one or more indices. For data streams, the API retrieves store information for the stream's backing indices. The index shard stores API returns the following information: * The node on which each replica shard exists. * The allocation ID for each replica shard. * A unique ID for each replica shard. * Any errors encountered while opening the shard index or from an earlier failure. By default, the API returns store information only for primary shards that are unassigned or have one or more unassigned replica shards.

## Method Signature

```typescript
client.indices.shardStores(this: That, params?: T.IndicesShardStoresRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesShardStoresResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesShardStoresRequest`](../types/IndicesShardStoresRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesShardStoresResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
