# Client.ilm.putLifecycle

Create or update a lifecycle policy. If the specified policy exists, it is replaced and the policy version is incremented. NOTE: Only the latest version of the policy is stored, you cannot revert to previous versions.

## Method Signature

```typescript
client.ilm.putLifecycle(this: That, params: T.IlmPutLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmPutLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IlmPutLifecycleRequest`](../types/IlmPutLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmPutLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
