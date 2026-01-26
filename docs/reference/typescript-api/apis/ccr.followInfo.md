# Client.ccr.followInfo

Get follower information. Get information about all cross-cluster replication follower indices. For example, the results include follower index names, leader index names, replication options, and whether the follower indices are active or paused.

## Method Signature

```typescript
client.ccr.followInfo(this: That, params: T.CcrFollowInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrFollowInfoResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrFollowInfoRequest`](../types/CcrFollowInfoRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrFollowInfoResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
