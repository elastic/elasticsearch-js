# Client.ml.putFilter

Create a filter. A filter contains a list of strings. It can be used by one or more anomaly detection jobs. Specifically, filters are referenced in the `custom_rules` property of detector configuration objects.

## Method Signature

```typescript
client.ml.putFilter(this: That, params: T.MlPutFilterRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPutFilterResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPutFilterRequest`](../types/MlPutFilterRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPutFilterResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
