# Client.snapshot.restore

Restore a snapshot. Restore a snapshot of a cluster or data streams and indices. You can restore a snapshot only to a running cluster with an elected master node. The snapshot repository must be registered and available to the cluster. The snapshot and cluster versions must be compatible. To restore a snapshot, the cluster's global metadata must be writable. Ensure there are't any cluster blocks that prevent writes. The restore operation ignores index blocks. Before you restore a data stream, ensure the cluster contains a matching index template with data streams enabled. To check, use the index management feature in Kibana or the get index template API: ``` GET _index_template/*?filter_path=index_templates.name,index_templates.index_template.index_patterns,index_templates.index_template.data_stream ``` If no such template exists, you can create one or restore a cluster state that contains one. Without a matching index template, a data stream can't roll over or create backing indices. If your snapshot contains data from App Search or Workplace Search, you must restore the Enterprise Search encryption key before you restore the snapshot.

## Method Signature

```typescript
client.snapshot.restore(this: That, params: T.SnapshotRestoreRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotRestoreResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotRestoreRequest`](../types/SnapshotRestoreRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotRestoreResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
