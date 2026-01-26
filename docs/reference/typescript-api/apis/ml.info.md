# Client.ml.info

Get machine learning information. Get defaults and limits used by machine learning. This endpoint is designed to be used by a user interface that needs to fully understand machine learning configurations where some options are not specified, meaning that the defaults should be used. This endpoint may be used to find out what those defaults are. It also provides information about the maximum size of machine learning jobs that could run in the current cluster configuration.

## Method Signature

```typescript
client.ml.info(this: That, params?: T.MlInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlInfoResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlInfoRequest`](../types/MlInfoRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlInfoResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
