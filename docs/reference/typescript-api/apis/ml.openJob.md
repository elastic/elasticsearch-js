# Client.ml.openJob

Open anomaly detection jobs. An anomaly detection job must be opened to be ready to receive and analyze data. It can be opened and closed multiple times throughout its lifecycle. When you open a new job, it starts with an empty model. When you open an existing job, the most recent model state is automatically loaded. The job is ready to resume its analysis from where it left off, once new data is received.

## Method Signature

```typescript
client.ml.openJob(this: That, params: T.MlOpenJobRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlOpenJobResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlOpenJobRequest`](../types/MlOpenJobRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlOpenJobResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
