# Client.rollup.putJob

Create a rollup job. WARNING: From 8.15.0, calling this API in a cluster with no rollup usage will fail with a message about the deprecation and planned removal of rollup features. A cluster needs to contain either a rollup job or a rollup index in order for this API to be allowed to run. The rollup job configuration contains all the details about how the job should run, when it indexes documents, and what future queries will be able to run against the rollup index. There are three main sections to the job configuration: the logistical details about the job (for example, the cron schedule), the fields that are used for grouping, and what metrics to collect for each group. Jobs are created in a `STOPPED` state. You can start them with the start rollup jobs API.

## Method Signature

```typescript
client.rollup.putJob(this: That, params: T.RollupPutJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupPutJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`RollupPutJobRequest`](../types/RollupPutJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupPutJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
