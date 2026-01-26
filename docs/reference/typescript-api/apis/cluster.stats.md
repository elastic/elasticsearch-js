# Client.cluster.stats

Get cluster statistics. Get basic index metrics (shard numbers, store size, memory usage) and information about the current nodes that form the cluster (number, roles, os, jvm versions, memory usage, cpu and installed plugins).

## Method Signature

```typescript
client.cluster.stats(this: That, params?: T.ClusterStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterStatsRequest`](../types/ClusterStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
