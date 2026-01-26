# Client.indices.clone

Clone an index. Clone an existing index into a new index. Each original primary shard is cloned into a new primary shard in the new index. IMPORTANT: Elasticsearch does not apply index templates to the resulting index. The API also does not copy index metadata from the original index. Index metadata includes aliases, index lifecycle management phase definitions, and cross-cluster replication (CCR) follower information. For example, if you clone a CCR follower index, the resulting clone will not be a follower index. The clone API copies most index settings from the source index to the resulting index, with the exception of `index.number_of_replicas` and `index.auto_expand_replicas`. To set the number of replicas in the resulting index, configure these settings in the clone request. Cloning works as follows: * First, it creates a new target index with the same definition as the source index. * Then it hard-links segments from the source index into the target index. If the file system does not support hard-linking, all segments are copied into the new index, which is a much more time consuming process. * Finally, it recovers the target index as though it were a closed index which had just been re-opened. IMPORTANT: Indices can only be cloned if they meet the following requirements: * The index must be marked as read-only and have a cluster health status of green. * The target index must not exist. * The source index must have the same number of primary shards as the target index. * The node handling the clone process must have sufficient free disk space to accommodate a second copy of the existing index. The current write index on a data stream cannot be cloned. In order to clone the current write index, the data stream must first be rolled over so that a new write index is created and then the previous write index can be cloned. NOTE: Mappings cannot be specified in the `_clone` request. The mappings of the source index will be used for the target index. **Monitor the cloning process** The cloning process can be monitored with the cat recovery API or the cluster health API can be used to wait until all primary shards have been allocated by setting the `wait_for_status` parameter to `yellow`. The `_clone` API returns as soon as the target index has been added to the cluster state, before any shards have been allocated. At this point, all shards are in the state unassigned. If, for any reason, the target index can't be allocated, its primary shard will remain unassigned until it can be allocated on that node. Once the primary shard is allocated, it moves to state initializing, and the clone process begins. When the clone operation completes, the shard will become active. At that point, Elasticsearch will try to allocate any replicas and may decide to relocate the primary shard to another node. **Wait for active shards** Because the clone operation creates a new index to clone the shards to, the wait for active shards setting on index creation applies to the clone index action as well.

## Method Signature

```typescript
client.indices.clone(this: That, params: T.IndicesCloneRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesCloneResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesCloneRequest`](../types/IndicesCloneRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesCloneResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
