# Client.indices.putSettings

Update index settings. Changes dynamic index settings in real time. For data streams, index setting changes are applied to all backing indices by default. To revert a setting to the default value, use a null value. The list of per-index settings that can be updated dynamically on live indices can be found in index settings documentation. To preserve existing settings from being updated, set the `preserve_existing` parameter to `true`. For performance optimization during bulk indexing, you can disable the refresh interval. Refer to [disable refresh interval](https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed#disable-refresh-interval) for an example. There are multiple valid ways to represent index settings in the request body. You can specify only the setting, for example: ``` { "number_of_replicas": 1 } ``` Or you can use an `index` setting object: ``` { "index": { "number_of_replicas": 1 } } ``` Or you can use dot annotation: ``` { "index.number_of_replicas": 1 } ``` Or you can embed any of the aforementioned options in a `settings` object. For example: ``` { "settings": { "index": { "number_of_replicas": 1 } } } ``` NOTE: You can only define new analyzers on closed indices. To add an analyzer, you must close the index, define the analyzer, and reopen the index. You cannot close the write index of a data stream. To update the analyzer for a data stream's write index and future backing indices, update the analyzer in the index template used by the stream. Then roll over the data stream to apply the new analyzer to the stream's write index and future backing indices. This affects searches and any new data added to the stream after the rollover. However, it does not affect the data stream's backing indices or their existing data. To change the analyzer for existing backing indices, you must create a new data stream and reindex your data into it. Refer to [updating analyzers on existing indices](https://www.elastic.co/docs/manage-data/data-store/text-analysis/specify-an-analyzer#update-analyzers-on-existing-indices) for step-by-step examples.

## Method Signature

```typescript
client.indices.putSettings(this: That, params: T.IndicesPutSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPutSettingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPutSettingsRequest`](../types/IndicesPutSettingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPutSettingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
