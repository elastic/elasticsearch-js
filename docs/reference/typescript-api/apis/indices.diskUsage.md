# Client.indices.diskUsage

Analyze the index disk usage. Analyze the disk usage of each field of an index or data stream. This API might not support indices created in previous Elasticsearch versions. The result of a small index can be inaccurate as some parts of an index might not be analyzed by the API. NOTE: The total size of fields of the analyzed shards of the index in the response is usually smaller than the index `store_size` value because some small metadata files are ignored and some parts of data files might not be scanned by the API. Since stored fields are stored together in a compressed format, the sizes of stored fields are also estimates and can be inaccurate. The stored size of the `_id` field is likely underestimated while the `_source` field is overestimated. For usage examples see the External documentation or refer to [Analyze the index disk usage example](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/index-disk-usage) for an example.

## Method Signature

```typescript
client.indices.diskUsage(this: That, params: T.IndicesDiskUsageRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesDiskUsageResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesDiskUsageRequest`](../types/IndicesDiskUsageRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesDiskUsageResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
