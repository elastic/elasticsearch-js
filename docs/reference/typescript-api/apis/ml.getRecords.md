# Client.ml.getRecords

Get anomaly records for an anomaly detection job. Records contain the detailed analytical results. They describe the anomalous activity that has been identified in the input data based on the detector configuration. There can be many anomaly records depending on the characteristics and size of the input data. In practice, there are often too many to be able to manually process them. The machine learning features therefore perform a sophisticated aggregation of the anomaly records into buckets. The number of record results depends on the number of anomalies found in each bucket, which relates to the number of time series being modeled and the number of detectors.

## Method Signature

```typescript
client.ml.getRecords(this: That, params: T.MlGetRecordsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetRecordsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlGetRecordsRequest`](../types/MlGetRecordsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetRecordsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
