# Client.slm.executeLifecycle

Run a policy. Immediately create a snapshot according to the snapshot lifecycle policy without waiting for the scheduled time. The snapshot policy is normally applied according to its schedule, but you might want to manually run a policy before performing an upgrade or other maintenance.

## Method Signature

```typescript
client.slm.executeLifecycle(this: That, params: T.SlmExecuteLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SlmExecuteLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SlmExecuteLifecycleRequest`](../types/SlmExecuteLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SlmExecuteLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
