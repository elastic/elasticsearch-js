# Client.ccr.forgetFollower

Forget a follower. Remove the cross-cluster replication follower retention leases from the leader. A following index takes out retention leases on its leader index. These leases are used to increase the likelihood that the shards of the leader index retain the history of operations that the shards of the following index need to run replication. When a follower index is converted to a regular index by the unfollow API (either by directly calling the API or by index lifecycle management tasks), these leases are removed. However, removal of the leases can fail, for example when the remote cluster containing the leader index is unavailable. While the leases will eventually expire on their own, their extended existence can cause the leader index to hold more history than necessary and prevent index lifecycle management from performing some operations on the leader index. This API exists to enable manually removing the leases when the unfollow API is unable to do so. NOTE: This API does not stop replication by a following index. If you use this API with a follower index that is still actively following, the following index will add back retention leases on the leader. The only purpose of this API is to handle the case of failure to remove the following retention leases after the unfollow API is invoked.

## Method Signature

```typescript
client.ccr.forgetFollower(this: That, params: T.CcrForgetFollowerRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrForgetFollowerResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrForgetFollowerRequest`](../types/CcrForgetFollowerRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrForgetFollowerResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
