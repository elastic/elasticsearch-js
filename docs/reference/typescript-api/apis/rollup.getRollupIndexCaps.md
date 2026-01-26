# Client.rollup.getRollupIndexCaps

Get the rollup index capabilities. Get the rollup capabilities of all jobs inside of a rollup index. A single rollup index may store the data for multiple rollup jobs and may have a variety of capabilities depending on those jobs. This API enables you to determine: * What jobs are stored in an index (or indices specified via a pattern)? * What target indices were rolled up, what fields were used in those rollups, and what aggregations can be performed on each job?

## Method Signature

```typescript
client.rollup.getRollupIndexCaps(this: That, params: T.RollupGetRollupIndexCapsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupGetRollupIndexCapsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`RollupGetRollupIndexCapsRequest`](../types/RollupGetRollupIndexCapsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupGetRollupIndexCapsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
