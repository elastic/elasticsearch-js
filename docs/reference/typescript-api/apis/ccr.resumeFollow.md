# Client.ccr.resumeFollow

Resume a follower. Resume a cross-cluster replication follower index that was paused. The follower index could have been paused with the pause follower API. Alternatively it could be paused due to replication that cannot be retried due to failures during following tasks. When this API returns, the follower index will resume fetching operations from the leader index.

## Method Signature

```typescript
client.ccr.resumeFollow(this: That, params: T.CcrResumeFollowRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrResumeFollowResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrResumeFollowRequest`](../types/CcrResumeFollowRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrResumeFollowResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
