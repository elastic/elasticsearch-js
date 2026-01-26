# Client.inference.delete

Delete an inference endpoint. This API requires the manage_inference cluster privilege (the built-in `inference_admin` role grants this privilege).

## Method Signature

```typescript
client.inference.delete(this: That, params: T.InferenceDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferenceDeleteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferenceDeleteRequest`](../types/InferenceDeleteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferenceDeleteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
