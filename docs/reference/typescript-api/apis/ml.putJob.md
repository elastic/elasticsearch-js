# Client.ml.putJob

Create an anomaly detection job. If you include a `datafeed_config`, you must have read index privileges on the source index. If you include a `datafeed_config` but do not provide a query, the datafeed uses `{"match_all": {"boost": 1}}`.

## Method Signature

```typescript
client.ml.putJob(this: That, params: T.MlPutJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPutJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPutJobRequest`](../types/MlPutJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPutJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
