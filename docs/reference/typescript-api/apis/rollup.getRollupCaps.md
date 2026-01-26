# Client.rollup.getRollupCaps

Get the rollup job capabilities. Get the capabilities of any rollup jobs that have been configured for a specific index or index pattern. This API is useful because a rollup job is often configured to rollup only a subset of fields from the source index. Furthermore, only certain aggregations can be configured for various fields, leading to a limited subset of functionality depending on that configuration. This API enables you to inspect an index and determine: 1. Does this index have associated rollup data somewhere in the cluster? 2. If yes to the first question, what fields were rolled up, what aggregations can be performed, and where does the data live?

## Method Signature

```typescript
client.rollup.getRollupCaps(this: That, params?: T.RollupGetRollupCapsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupGetRollupCapsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`RollupGetRollupCapsRequest`](../types/RollupGetRollupCapsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupGetRollupCapsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
