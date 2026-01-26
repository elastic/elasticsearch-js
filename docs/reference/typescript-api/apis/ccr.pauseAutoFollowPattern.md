# Client.ccr.pauseAutoFollowPattern

Pause an auto-follow pattern. Pause a cross-cluster replication auto-follow pattern. When the API returns, the auto-follow pattern is inactive. New indices that are created on the remote cluster and match the auto-follow patterns are ignored. You can resume auto-following with the resume auto-follow pattern API. When it resumes, the auto-follow pattern is active again and automatically configures follower indices for newly created indices on the remote cluster that match its patterns. Remote indices that were created while the pattern was paused will also be followed, unless they have been deleted or closed in the interim.

## Method Signature

```typescript
client.ccr.pauseAutoFollowPattern(this: That, params: T.CcrPauseAutoFollowPatternRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrPauseAutoFollowPatternResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrPauseAutoFollowPatternRequest`](../types/CcrPauseAutoFollowPatternRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrPauseAutoFollowPatternResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
