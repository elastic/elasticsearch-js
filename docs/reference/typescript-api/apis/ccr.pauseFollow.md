# Client.ccr.pauseFollow

Pause a follower. Pause a cross-cluster replication follower index. The follower index will not fetch any additional operations from the leader index. You can resume following with the resume follower API. You can pause and resume a follower index to change the configuration of the following task.

## Method Signature

```typescript
client.ccr.pauseFollow(this: That, params: T.CcrPauseFollowRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrPauseFollowResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrPauseFollowRequest`](../types/CcrPauseFollowRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrPauseFollowResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
