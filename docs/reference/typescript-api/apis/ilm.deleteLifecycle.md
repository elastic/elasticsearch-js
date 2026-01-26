# Client.ilm.deleteLifecycle

Delete a lifecycle policy. You cannot delete policies that are currently in use. If the policy is being used to manage any indices, the request fails and returns an error.

## Method Signature

```typescript
client.ilm.deleteLifecycle(this: That, params: T.IlmDeleteLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmDeleteLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IlmDeleteLifecycleRequest`](../types/IlmDeleteLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmDeleteLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
