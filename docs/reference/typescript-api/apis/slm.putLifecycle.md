# Client.slm.putLifecycle

Create or update a policy. Create or update a snapshot lifecycle policy. If the policy already exists, this request increments the policy version. Only the latest version of a policy is stored.

## Method Signature

```typescript
client.slm.putLifecycle(this: That, params: T.SlmPutLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SlmPutLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SlmPutLifecycleRequest`](../types/SlmPutLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SlmPutLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
