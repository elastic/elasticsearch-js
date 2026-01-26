# Client.ccr.followStats

Get follower stats. Get cross-cluster replication follower stats. The API returns shard-level stats about the "following tasks" associated with each shard for the specified indices.

## Method Signature

```typescript
client.ccr.followStats(this: That, params: T.CcrFollowStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrFollowStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrFollowStatsRequest`](../types/CcrFollowStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrFollowStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
