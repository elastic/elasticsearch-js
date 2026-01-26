# Client.ml.postData

Send data to an anomaly detection job for analysis. IMPORTANT: For each job, data can be accepted from only a single connection at a time. It is not currently possible to post data to multiple jobs using wildcards or a comma-separated list.

## Method Signature

```typescript
client.ml.postData(this: That, params: T.MlPostDataRequest<TData>, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPostDataResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPostDataRequest`](../types/MlPostDataRequest.md)<TData> | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPostDataResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
