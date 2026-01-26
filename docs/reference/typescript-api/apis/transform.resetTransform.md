# Client.transform.resetTransform

Reset a transform. Before you can reset it, you must stop it; alternatively, use the `force` query parameter. If the destination index was created by the transform, it is deleted.

## Method Signature

```typescript
client.transform.resetTransform(this: That, params: T.TransformResetTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformResetTransformResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TransformResetTransformRequest`](../types/TransformResetTransformRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformResetTransformResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
