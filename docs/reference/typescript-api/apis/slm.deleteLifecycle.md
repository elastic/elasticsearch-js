# Client.slm.deleteLifecycle

Delete a policy. Delete a snapshot lifecycle policy definition. This operation prevents any future snapshots from being taken but does not cancel in-progress snapshots or remove previously-taken snapshots.

## Method Signature

```typescript
client.slm.deleteLifecycle(this: That, params: T.SlmDeleteLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SlmDeleteLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SlmDeleteLifecycleRequest`](../types/SlmDeleteLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SlmDeleteLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
