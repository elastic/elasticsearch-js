# Client.ml.deleteExpiredData

Delete expired ML data. Delete all job results, model snapshots and forecast data that have exceeded their retention days period. Machine learning state documents that are not associated with any job are also deleted. You can limit the request to a single or set of anomaly detection jobs by using a job identifier, a group name, a comma-separated list of jobs, or a wildcard expression. You can delete expired data for all anomaly detection jobs by using `_all`, by specifying `*` as the `<job_id>`, or by omitting the `<job_id>`.

## Method Signature

```typescript
client.ml.deleteExpiredData(this: That, params?: T.MlDeleteExpiredDataRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteExpiredDataResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlDeleteExpiredDataRequest`](../types/MlDeleteExpiredDataRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteExpiredDataResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
