# Client.ml.getBuckets

Get anomaly detection job results for buckets. The API presents a chronological view of the records, grouped by bucket.

## Method Signature

```typescript
client.ml.getBuckets(this: That, params: T.MlGetBucketsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetBucketsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlGetBucketsRequest`](../types/MlGetBucketsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetBucketsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
