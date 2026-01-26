# Client.ml.getInfluencers

Get anomaly detection job results for influencers. Influencers are the entities that have contributed to, or are to blame for, the anomalies. Influencer results are available only if an `influencer_field_name` is specified in the job configuration.

## Method Signature

```typescript
client.ml.getInfluencers(this: That, params: T.MlGetInfluencersRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetInfluencersResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlGetInfluencersRequest`](../types/MlGetInfluencersRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetInfluencersResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
