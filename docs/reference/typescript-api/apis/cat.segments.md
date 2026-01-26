# Client.cat.segments

Get segment information. Get low-level information about the Lucene segments in index shards. For data streams, the API returns information about the backing indices. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the index segments API.

## Method Signature

```typescript
client.cat.segments(this: That, params?: T.CatSegmentsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatSegmentsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatSegmentsRequest`](../types/CatSegmentsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatSegmentsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
