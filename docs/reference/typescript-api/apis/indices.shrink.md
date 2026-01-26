# Client.indices.shrink

Shrink an index. Shrink an index into a new index with fewer primary shards. Before you can shrink an index: * The index must be read-only. * A copy of every shard in the index must reside on the same node. * The index must have a green health status. To make shard allocation easier, we recommend you also remove the index's replica shards. You can later re-add replica shards as part of the shrink operation. The requested number of primary shards in the target index must be a factor of the number of shards in the source index. For example an index with 8 primary shards can be shrunk into 4, 2 or 1 primary shards or an index with 15 primary shards can be shrunk into 5, 3 or 1. If the number of shards in the index is a prime number it can only be shrunk into a single primary shard Before shrinking, a (primary or replica) copy of every shard in the index must be present on the same node. The current write index on a data stream cannot be shrunk. In order to shrink the current write index, the data stream must first be rolled over so that a new write index is created and then the previous write index can be shrunk. A shrink operation: * Creates a new target index with the same definition as the source index, but with a smaller number of primary shards. * Hard-links segments from the source index into the target index. If the file system does not support hard-linking, then all segments are copied into the new index, which is a much more time consuming process. Also if using multiple data paths, shards on different data paths require a full copy of segment files if they are not on the same disk since hardlinks do not work across disks. * Recovers the target index as though it were a closed index which had just been re-opened. Recovers shards to the `.routing.allocation.initial_recovery._id` index setting. IMPORTANT: Indices can only be shrunk if they satisfy the following requirements: * The target index must not exist. * The source index must have more primary shards than the target index. * The number of primary shards in the target index must be a factor of the number of primary shards in the source index. The source index must have more primary shards than the target index. * The index must not contain more than 2,147,483,519 documents in total across all shards that will be shrunk into a single shard on the target index as this is the maximum number of docs that can fit into a single shard. * The node handling the shrink process must have sufficient free disk space to accommodate a second copy of the existing index.

## Method Signature

```typescript
client.indices.shrink(this: That, params: T.IndicesShrinkRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesShrinkResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesShrinkRequest`](../types/IndicesShrinkRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesShrinkResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
