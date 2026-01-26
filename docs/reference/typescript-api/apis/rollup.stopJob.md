# Client.rollup.stopJob

Stop rollup jobs. If you try to stop a job that does not exist, an exception occurs. If you try to stop a job that is already stopped, nothing happens. Since only a stopped job can be deleted, it can be useful to block the API until the indexer has fully stopped. This is accomplished with the `wait_for_completion` query parameter, and optionally a timeout. For example: ``` POST _rollup/job/sensor/_stop?wait_for_completion=true&timeout=10s ``` The parameter blocks the API call from returning until either the job has moved to STOPPED or the specified time has elapsed. If the specified time elapses without the job moving to STOPPED, a timeout exception occurs.

## Method Signature

```typescript
client.rollup.stopJob(this: That, params: T.RollupStopJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupStopJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`RollupStopJobRequest`](../types/RollupStopJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupStopJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
