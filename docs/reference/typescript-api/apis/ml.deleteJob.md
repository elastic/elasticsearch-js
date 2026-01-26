# Client.ml.deleteJob

Delete an anomaly detection job. All job configuration, model state and results are deleted. It is not currently possible to delete multiple jobs using wildcards or a comma separated list. If you delete a job that has a datafeed, the request first tries to delete the datafeed. This behavior is equivalent to calling the delete datafeed API with the same timeout and force parameters as the delete job request.

## Method Signature

```typescript
client.ml.deleteJob(this: That, params: T.MlDeleteJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlDeleteJobRequest`](../types/MlDeleteJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
