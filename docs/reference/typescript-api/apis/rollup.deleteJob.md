# Client.rollup.deleteJob

Delete a rollup job. A job must be stopped before it can be deleted. If you attempt to delete a started job, an error occurs. Similarly, if you attempt to delete a nonexistent job, an exception occurs. IMPORTANT: When you delete a job, you remove only the process that is actively monitoring and rolling up data. The API does not delete any previously rolled up data. This is by design; a user may wish to roll up a static data set. Because the data set is static, after it has been fully rolled up there is no need to keep the indexing rollup job around (as there will be no new data). Thus the job can be deleted, leaving behind the rolled up data for analysis. If you wish to also remove the rollup data and the rollup index contains the data for only a single job, you can delete the whole rollup index. If the rollup index stores data from several jobs, you must issue a delete-by-query that targets the rollup job's identifier in the rollup index. For example: ``` POST my_rollup_index/_delete_by_query { "query": { "term": { "_rollup.id": "the_rollup_job_id" } } } ```

## Method Signature

```typescript
client.rollup.deleteJob(this: That, params: T.RollupDeleteJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupDeleteJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`RollupDeleteJobRequest`](../types/RollupDeleteJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupDeleteJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
