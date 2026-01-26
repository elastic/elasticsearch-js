# Client.ccr.resumeAutoFollowPattern

Resume an auto-follow pattern. Resume a cross-cluster replication auto-follow pattern that was paused. The auto-follow pattern will resume configuring following indices for newly created indices that match its patterns on the remote cluster. Remote indices created while the pattern was paused will also be followed unless they have been deleted or closed in the interim.

## Method Signature

```typescript
client.ccr.resumeAutoFollowPattern(this: That, params: T.CcrResumeAutoFollowPatternRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CcrResumeAutoFollowPatternResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`CcrResumeAutoFollowPatternRequest`](../types/CcrResumeAutoFollowPatternRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CcrResumeAutoFollowPatternResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
