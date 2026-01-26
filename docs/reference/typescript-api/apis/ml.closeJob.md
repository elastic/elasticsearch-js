# Client.ml.closeJob

Close anomaly detection jobs. A job can be opened and closed multiple times throughout its lifecycle. A closed job cannot receive data or perform analysis operations, but you can still explore and navigate results. When you close a job, it runs housekeeping tasks such as pruning the model history, flushing buffers, calculating final results and persisting the model snapshots. Depending upon the size of the job, it could take several minutes to close and the equivalent time to re-open. After it is closed, the job has a minimal overhead on the cluster except for maintaining its meta data. Therefore it is a best practice to close jobs that are no longer required to process data. If you close an anomaly detection job whose datafeed is running, the request first tries to stop the datafeed. This behavior is equivalent to calling stop datafeed API with the same timeout and force parameters as the close job request. When a datafeed that has a specified end date stops, it automatically closes its associated job.

## Method Signature

```typescript
client.ml.closeJob(this: That, params: T.MlCloseJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlCloseJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlCloseJobRequest`](../types/MlCloseJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlCloseJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
