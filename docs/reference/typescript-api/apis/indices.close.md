# Client.indices.close

Close an index. A closed index is blocked for read or write operations and does not allow all operations that opened indices allow. It is not possible to index documents or to search for documents in a closed index. Closed indices do not have to maintain internal data structures for indexing or searching documents, which results in a smaller overhead on the cluster. When opening or closing an index, the master node is responsible for restarting the index shards to reflect the new state of the index. The shards will then go through the normal recovery process. The data of opened and closed indices is automatically replicated by the cluster to ensure that enough shard copies are safely kept around at all times. You can open and close multiple indices. An error is thrown if the request explicitly refers to a missing index. This behaviour can be turned off using the `ignore_unavailable=true` parameter. By default, you must explicitly name the indices you are opening or closing. To open or close indices with `_all`, `*`, or other wildcard expressions, change the` action.destructive_requires_name` setting to `false`. This setting can also be changed with the cluster update settings API. Closed indices consume a significant amount of disk-space which can cause problems in managed environments. Closing indices can be turned off with the cluster settings API by setting `cluster.indices.close.enable` to `false`.

## Method Signature

```typescript
client.indices.close(this: That, params: T.IndicesCloseRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesCloseResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesCloseRequest`](../types/IndicesCloseRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesCloseResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
