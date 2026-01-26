# Client.rollup.getJobs

Get rollup job information. Get the configuration, stats, and status of rollup jobs. NOTE: This API returns only active (both `STARTED` and `STOPPED`) jobs. If a job was created, ran for a while, then was deleted, the API does not return any details about it. For details about a historical rollup job, the rollup capabilities API may be more useful.

## Method Signature

```typescript
client.rollup.getJobs(this: That, params?: T.RollupGetJobsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupGetJobsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`RollupGetJobsRequest`](../types/RollupGetJobsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupGetJobsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
