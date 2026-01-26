# Client.indices.split

Split an index. Split an index into a new index with more primary shards. * Before you can split an index: * The index must be read-only. * The cluster health status must be green. You can do make an index read-only with the following request using the add index block API: ``` PUT /my_source_index/_block/write ``` The current write index on a data stream cannot be split. In order to split the current write index, the data stream must first be rolled over so that a new write index is created and then the previous write index can be split. The number of times the index can be split (and the number of shards that each original shard can be split into) is determined by the `index.number_of_routing_shards` setting. The number of routing shards specifies the hashing space that is used internally to distribute documents across shards with consistent hashing. For instance, a 5 shard index with `number_of_routing_shards` set to 30 (5 x 2 x 3) could be split by a factor of 2 or 3. A split operation: * Creates a new target index with the same definition as the source index, but with a larger number of primary shards. * Hard-links segments from the source index into the target index. If the file system doesn't support hard-linking, all segments are copied into the new index, which is a much more time consuming process. * Hashes all documents again, after low level files are created, to delete documents that belong to a different shard. * Recovers the target index as though it were a closed index which had just been re-opened. IMPORTANT: Indices can only be split if they satisfy the following requirements: * The target index must not exist. * The source index must have fewer primary shards than the target index. * The number of primary shards in the target index must be a multiple of the number of primary shards in the source index. * The node handling the split process must have sufficient free disk space to accommodate a second copy of the existing index.

## Method Signature

```typescript
client.indices.split(this: That, params: T.IndicesSplitRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesSplitResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesSplitRequest`](../types/IndicesSplitRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesSplitResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
