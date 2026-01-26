# Client.slm.executeRetention

Run a retention policy. Manually apply the retention policy to force immediate removal of snapshots that are expired according to the snapshot lifecycle policy retention rules. The retention policy is normally applied according to its schedule.

## Method Signature

```typescript
client.slm.executeRetention(this: That, params?: T.SlmExecuteRetentionRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SlmExecuteRetentionResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SlmExecuteRetentionRequest`](../types/SlmExecuteRetentionRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SlmExecuteRetentionResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
