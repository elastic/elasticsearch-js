# Client.ml.getJobs

Get anomaly detection jobs configuration info. You can get information for multiple anomaly detection jobs in a single API request by using a group name, a comma-separated list of jobs, or a wildcard expression. You can get information for all anomaly detection jobs by using `_all`, by specifying `*` as the `<job_id>`, or by omitting the `<job_id>`.

## Method Signature

```typescript
client.ml.getJobs(this: That, params?: T.MlGetJobsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetJobsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlGetJobsRequest`](../types/MlGetJobsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetJobsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
