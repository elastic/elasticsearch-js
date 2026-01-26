# Client.ml.resetJob

Reset an anomaly detection job. All model state and results are deleted. The job is ready to start over as if it had just been created. It is not currently possible to reset multiple jobs using wildcards or a comma separated list.

## Method Signature

```typescript
client.ml.resetJob(this: That, params: T.MlResetJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlResetJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlResetJobRequest`](../types/MlResetJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlResetJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
