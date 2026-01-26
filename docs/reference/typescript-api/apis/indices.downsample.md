# Client.indices.downsample

Downsample an index. Downsamples a time series (TSDS) index and reduces its size by keeping the last value or by pre-aggregating metrics: - When running in `aggregate` mode, it pre-calculates and stores statistical summaries (`min`, `max`, `sum`, `value_count` and `avg`) for each metric field grouped by a configured time interval and their dimensions. - When running in `last_value` mode, it keeps the last value for each metric in the configured interval and their dimensions. For example, a TSDS index that contains metrics sampled every 10 seconds can be downsampled to an hourly index. All documents within an hour interval are summarized and stored as a single document in the downsample index. NOTE: Only indices in a time series data stream are supported. Neither field nor document level security can be defined on the source index. The source index must be read-only (`index.blocks.write: true`).

## Method Signature

```typescript
client.indices.downsample(this: That, params: T.IndicesDownsampleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesDownsampleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesDownsampleRequest`](../types/IndicesDownsampleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesDownsampleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
