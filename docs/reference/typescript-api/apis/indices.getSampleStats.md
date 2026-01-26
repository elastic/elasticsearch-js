# Client.indices.getSampleStats

Request stats for a random sample of raw documents ingested into the given index or data stream.

## Method Signature

```typescript
client.indices.getSampleStats(this: That, params: T.IndicesGetSampleStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetSampleStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesGetSampleStatsRequest`](../types/IndicesGetSampleStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetSampleStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
