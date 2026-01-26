# Client.indices.segments

Get index segments. Get low-level information about the Lucene segments in index shards. For data streams, the API returns information about the stream's backing indices.

## Method Signature

```typescript
client.indices.segments(this: That, params?: T.IndicesSegmentsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesSegmentsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesSegmentsRequest`](../types/IndicesSegmentsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesSegmentsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
