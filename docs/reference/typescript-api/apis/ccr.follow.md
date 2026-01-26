# Client.ccr.follow

Create a follower. Create a cross-cluster replication follower index that follows a specific leader index. When the API returns, the follower index exists and cross-cluster replication starts replicating operations from the leader index to the follower index.

## Method Signature

```typescript
client.ccr.follow(this: That, params: T.CcrFollowRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrFollowResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrFollowRequest`](../types/CcrFollowRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrFollowResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
