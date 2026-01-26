# Client.ccr.putAutoFollowPattern

Create or update auto-follow patterns. Create a collection of cross-cluster replication auto-follow patterns for a remote cluster. Newly created indices on the remote cluster that match any of the patterns are automatically configured as follower indices. Indices on the remote cluster that were created before the auto-follow pattern was created will not be auto-followed even if they match the pattern. This API can also be used to update auto-follow patterns. NOTE: Follower indices that were configured automatically before updating an auto-follow pattern will remain unchanged even if they do not match against the new patterns.

## Method Signature

```typescript
client.ccr.putAutoFollowPattern(this: That, params: T.CcrPutAutoFollowPatternRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrPutAutoFollowPatternResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrPutAutoFollowPatternRequest`](../types/CcrPutAutoFollowPatternRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrPutAutoFollowPatternResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
