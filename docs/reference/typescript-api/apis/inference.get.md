# Client.inference.get

Get an inference endpoint. This API requires the `monitor_inference` cluster privilege (the built-in `inference_admin` and `inference_user` roles grant this privilege).

## Method Signature

```typescript
client.inference.get(this: That, params?: T.InferenceGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferenceGetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`InferenceGetRequest`](../types/InferenceGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferenceGetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
