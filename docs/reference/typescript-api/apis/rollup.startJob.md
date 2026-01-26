# Client.rollup.startJob

Start rollup jobs. If you try to start a job that does not exist, an exception occurs. If you try to start a job that is already started, nothing happens.

## Method Signature

```typescript
client.rollup.startJob(this: That, params: T.RollupStartJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupStartJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`RollupStartJobRequest`](../types/RollupStartJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupStartJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
