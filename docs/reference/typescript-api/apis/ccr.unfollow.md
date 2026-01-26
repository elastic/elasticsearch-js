# Client.ccr.unfollow

Unfollow an index. Convert a cross-cluster replication follower index to a regular index. The API stops the following task associated with a follower index and removes index metadata and settings associated with cross-cluster replication. The follower index must be paused and closed before you call the unfollow API. > info > Currently cross-cluster replication does not support converting an existing regular index to a follower index. Converting a follower index to a regular index is an irreversible operation.

## Method Signature

```typescript
client.ccr.unfollow(this: That, params: T.CcrUnfollowRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrUnfollowResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrUnfollowRequest`](../types/CcrUnfollowRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrUnfollowResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
