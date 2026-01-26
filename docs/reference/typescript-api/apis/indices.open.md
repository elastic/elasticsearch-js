# Client.indices.open

Open a closed index. For data streams, the API opens any closed backing indices. A closed index is blocked for read/write operations and does not allow all operations that opened indices allow. It is not possible to index documents or to search for documents in a closed index. This allows closed indices to not have to maintain internal data structures for indexing or searching documents, resulting in a smaller overhead on the cluster. When opening or closing an index, the master is responsible for restarting the index shards to reflect the new state of the index. The shards will then go through the normal recovery process. The data of opened or closed indices is automatically replicated by the cluster to ensure that enough shard copies are safely kept around at all times. You can open and close multiple indices. An error is thrown if the request explicitly refers to a missing index. This behavior can be turned off by using the `ignore_unavailable=true` parameter. By default, you must explicitly name the indices you are opening or closing. To open or close indices with `_all`, `*`, or other wildcard expressions, change the `action.destructive_requires_name` setting to `false`. This setting can also be changed with the cluster update settings API. Closed indices consume a significant amount of disk-space which can cause problems in managed environments. Closing indices can be turned off with the cluster settings API by setting `cluster.indices.close.enable` to `false`. Because opening or closing an index allocates its shards, the `wait_for_active_shards` setting on index creation applies to the `_open` and `_close` index actions as well.

## Method Signature

```typescript
client.indices.open(this: That, params: T.IndicesOpenRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesOpenResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesOpenRequest`](../types/IndicesOpenRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesOpenResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
