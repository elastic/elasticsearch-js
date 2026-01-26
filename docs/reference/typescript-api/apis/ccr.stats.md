# Client.ccr.stats

Get cross-cluster replication stats. This API returns stats about auto-following and the same shard-level stats as the get follower stats API.

## Method Signature

```typescript
client.ccr.stats(this: That, params?: T.CcrStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CcrStatsRequest`](../types/CcrStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
