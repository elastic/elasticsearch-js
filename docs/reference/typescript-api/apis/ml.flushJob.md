# Client.ml.flushJob

Force buffered data to be processed. The flush jobs API is only applicable when sending data for analysis using the post data API. Depending on the content of the buffer, then it might additionally calculate new results. Both flush and close operations are similar, however the flush is more efficient if you are expecting to send more data for analysis. When flushing, the job remains open and is available to continue analyzing data. A close operation additionally prunes and persists the model state to disk and the job must be opened again before analyzing further data.

## Method Signature

```typescript
client.ml.flushJob(this: That, params: T.MlFlushJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlFlushJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlFlushJobRequest`](../types/MlFlushJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlFlushJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
