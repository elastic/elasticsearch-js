# Client.ml.deleteFilter

Delete a filter. If an anomaly detection job references the filter, you cannot delete the filter. You must update or delete the job before you can delete the filter.

## Method Signature

```typescript
client.ml.deleteFilter(this: That, params: T.MlDeleteFilterRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteFilterResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlDeleteFilterRequest`](../types/MlDeleteFilterRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteFilterResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
