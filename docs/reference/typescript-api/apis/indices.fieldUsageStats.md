# Client.indices.fieldUsageStats

Get field usage stats. Get field usage information for each shard and field of an index. Field usage statistics are automatically captured when queries are running on a cluster. A shard-level search request that accesses a given field, even if multiple times during that request, is counted as a single use. The response body reports the per-shard usage count of the data structures that back the fields in the index. A given request will increment each count by a maximum value of 1, even if the request accesses the same field multiple times.

## Method Signature

```typescript
client.indices.fieldUsageStats(this: That, params: T.IndicesFieldUsageStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesFieldUsageStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesFieldUsageStatsRequest`](../types/IndicesFieldUsageStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesFieldUsageStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
