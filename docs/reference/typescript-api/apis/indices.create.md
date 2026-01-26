# Client.indices.create

Create an index. You can use the create index API to add a new index to an Elasticsearch cluster. When creating an index, you can specify the following: * Settings for the index. * Mappings for fields in the index. * Index aliases **Wait for active shards** By default, index creation will only return a response to the client when the primary copies of each shard have been started, or the request times out. The index creation response will indicate what happened. For example, `acknowledged` indicates whether the index was successfully created in the cluster, `while shards_acknowledged` indicates whether the requisite number of shard copies were started for each shard in the index before timing out. Note that it is still possible for either `acknowledged` or `shards_acknowledged` to be `false`, but for the index creation to be successful. These values simply indicate whether the operation completed before the timeout. If `acknowledged` is false, the request timed out before the cluster state was updated with the newly created index, but it probably will be created sometime soon. If `shards_acknowledged` is false, then the request timed out before the requisite number of shards were started (by default just the primaries), even if the cluster state was successfully updated to reflect the newly created index (that is to say, `acknowledged` is `true`). You can change the default of only waiting for the primary shards to start through the index setting `index.write.wait_for_active_shards`. Note that changing this setting will also affect the `wait_for_active_shards` value on all subsequent write operations.

## Method Signature

```typescript
client.indices.create(this: That, params: T.IndicesCreateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesCreateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesCreateRequest`](../types/IndicesCreateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesCreateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
